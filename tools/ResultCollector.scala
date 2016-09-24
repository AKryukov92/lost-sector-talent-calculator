import java.io.PrintWriter

import scala.annotation.tailrec
import scala.collection.mutable.ListBuffer
import scala.io.Source
import scala.util.parsing.json.JSON

/**
 * @author akryukov
 *         15.02.2016
 */
object ResultCollector {

  val participantUrlPrefix = "http://forum.lsonline.ru/index.php?/topic/"
  val locationUrlPrefix = "http://ru.lost-sector.wikia.com/wiki/"
  val StepPattern = " (\\d*) ([a-zA-Z]*)[\\r\\n]*".r
  val LoseStepPattern = " (\\d*) loseBattle[\\r\\n]*".r
  val LoseByMissStepPattern = " (\\d*) loseByMiss[\\r\\n]*".r
  val WinStepPattern = " (\\d*) winBattle[\\r\\n]*".r
  val WinByMissStepPattern = " (\\d*) winByMiss[\\r\\n]*".r
  val EmptyStepPattern = " (\\d*) empty[\\r\\n]*".r
  val KingStepPattern = " (\\d*) king[\\r\\n]*".r
  
  val LeftPattern = "-left=(.*)".r
  val RightPattern = "-right=(.*)".r
  val ParticipantsPattern = "-pdict=(.*)".r
  val LocationsPattern = "-ldict=(.*)".r

  var LeftLocations: List[Location] = List[Location]()
  var RightLocations: List[Location] = List[Location]()
  var LocationInfoList: List[LocationInfo] = List[LocationInfo]()
  var ParticipantInfoList: List[ParticipantInfo] = List[ParticipantInfo]()

  class CC[T] { def unapply(a:Any):Option[T] = Some(a.asInstanceOf[T]) }
  object M extends CC[Map[String, Any]]
  object L extends CC[List[Any]]
  object S extends CC[String]
  object D extends CC[Double]
  object B extends CC[Boolean]

  class LocationInfo(key: String, name: String, url: String) {
    var Key: String = key
    var Name: String = name
    var Url: String = url
    var Location: Option[Location] = None
    var OldOwner: String = ""

    override def toString: String =
    if (Location.nonEmpty) {
      val participantString = Location.get.Participants
        .filter(p => !p.IsOwner())
        .sortBy(p=>p.StepStrings.length)
        .mkString
      "[size=5][b][url=" + locationUrlPrefix + Url + "]" + Name + "[/url][/b][/size]\n" +
        "Прежний владелец: [color=#ffa500]" + Location.get.GetOwner() + "[/color]\n" +
        "Новый владелец: [color=#ffa500]" + OldOwner + "[/color]\n" +
        "На локацию записывались:\n" +
        "[list]\n" + participantString + "[/list]\n"
    } else {
      ""
    }
  }
  
  class ParticipantInfo(key: String, url: String) {
    var Key: String = key
    var Url: String = url
  }

  class RawDataContainer(key : String, data: String) {
    var Key: String = key
    var Data: String = data

    override def toString: String = Key + " : " + Data
  }

  class Participant(raw: RawDataContainer) {
    var Name: String = raw.Key.trim
    var StepStrings: List[String] = extractFromData(raw.Data, "Tour", "[").map(d => d.Key)

    def IsOwner() = {
      StepStrings.exists(s => KingStepPattern.findAllIn(s).nonEmpty)
    }
    def parseResult(str: String): String = str match {
      case LoseStepPattern(str) =>
        val round = str.toInt
        if (round == 2)
          " - выбыли в первом туре"
        else if (round == 3)
          " - выбыли во втором туре"
        else
          " - выбыли в " + round + " туре"
      case LoseByMissStepPattern(str) =>
        val round = str.toInt
        if (round == 2)
          " - выбыли в первом туре по неявке"
        else if (round == 3)
          " - выбыли во втором туре по неявке"
        else
          " - выбыли в " + round + " туре по неявке"
      case _ =>
        StepStrings.last
    }
    def GetResult(): String = {
      parseResult(StepStrings.last)
    }
    def GetUrl() : String = {
      val info = ParticipantInfoList.find(p => p.Key == Name)
      if (info.isDefined)
        "=" + participantUrlPrefix + info.get.Url
      else
        ""
    }

    override def toString: String = "[*][url" + GetUrl + "]" + Name + "[/url]" + GetResult() + "[/*]\n"
  }

  class Location(raw: RawDataContainer) {
    var Name: String = raw.Key.trim
    var Participants: List[Participant] = extractFromData(raw.Data, "Clan", "[").map(d => new Participant(d))
    def GetOwner() = {
      val temp = Participants.find(p=>p.IsOwner())
      if (temp.isDefined) {
        temp.get.Name
      } else {
        ""
      }
    }
  }

  def extractFromData(source: String, elementDelimiter: String, keyValueDelimiter: String) : List[RawDataContainer] = {
    val ret = new ListBuffer[RawDataContainer]

    @tailrec
    def recurse(from: Int): Unit = {
      if (from >= 0) {
        val beginIndex = source.indexOf(elementDelimiter, from)
        val endIndex = source.indexOf(keyValueDelimiter, beginIndex)
        if (endIndex >= 0) {
          val nextIndex = source.indexOf(elementDelimiter, endIndex)
          if (nextIndex >= 0) {
            ret += new RawDataContainer(
              source.substring(beginIndex + elementDelimiter.length, endIndex),
              source.substring(endIndex, nextIndex)
            )
            recurse(nextIndex)
          } else {
            ret += new RawDataContainer(
              source.substring(beginIndex + elementDelimiter.length, endIndex),
              source.substring(endIndex, source.length())
            )
          }
        } else {
          ret += new RawDataContainer(
            source.substring(beginIndex + elementDelimiter.length, source.length()),
            ""
          )
        }
      }
    }
    recurse(0)
    ret.toList
  }

  def process(x: Array[String]) : Unit = {
    x.foreach {
      case LeftPattern(filename) =>
        val source = Source.fromFile(filename)
        val data = try source.mkString finally source.close()
        LeftLocations = extractFromData(data, "Base", "[").map(d => new Location(d))

      case RightPattern(filename) =>
        val source = Source.fromFile(filename)
        val data = try source.mkString finally source.close()
        RightLocations = extractFromData(data, "Base", "[").map(d => new Location(d))

      case LocationsPattern(filename) =>
        val source = Source.fromFile(filename)
        val data = try source.mkString finally source.close()
          LocationInfoList = for {
            Some(L(elements)) <- List(JSON.parseFull(data))
            M(element) <- elements
            S(key) = element("key")
            S(value) = element("value")
            S(url) = element("url")
          } yield {
            new LocationInfo(key, value, url)
          }

      case ParticipantsPattern(filename) =>
        val source = Source.fromFile(filename)
        val data = try source.mkString finally source.close()
          ParticipantInfoList = for {
            Some(L(elements)) <- List(JSON.parseFull(data))
            M(element) <- elements
            S(key) = element("key")
            S(url) = element("url")
          } yield {
            new ParticipantInfo(key, url)
          }

      case filename => System.out.println(filename)
    }
    LocationInfoList.foreach(lif => {
      lif.Location = RightLocations.find(rl => rl.Name.equals(lif.Key))
      val leftLocation = LeftLocations.find(ll => ll.Name.equals(lif.Key))
      if (leftLocation.isDefined) {
        lif.OldOwner = leftLocation.get.GetOwner()
      }
      lif.Location.get.Participants
    })

    new PrintWriter("C:\\Temp\\Result.txt") {
      write(LocationInfoList.mkString)
      close()
    }
  }

  def main(args: Array[String]): Unit = args match {
      case x if x.length < 3 =>
        System.out.println("You should specify two arguments")
      case x => process(x)
  }
}
