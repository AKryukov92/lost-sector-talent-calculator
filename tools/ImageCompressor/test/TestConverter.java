import com.company.ImageIdContainer;
import com.company.Main;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

public class TestConverter {
    ObjectMapper mapper;
    @Before
    public void setUp() {
        mapper = new ObjectMapper();
    }

    @Test
    public void test1() throws IOException {
        String input = "{\n" +
                "\t\"id\":62,\n" +
                "\t\"name\":\"���������� '������'\",\n" +
                "\t\"category\":\"consumable\",\n" +
                "\t\"consumable_type\":2,\n" +
                "\t\"description\":\"���: ����������\",\n" +
                "\t\"lvlreq\":2,\n" +
                "\t\"AP_cost\":40,\n" +
                "\t\"specials\":[\n" +
                "\t{\n" +
                "\t\t\"duration\":5,\n" +
                "\t\t\"effects\": [\n" +
                "\t\t\t\"����������� ���� � ������� ��� �� 50%.\",\n" +
                "\t\t\t\"��������� ����������� �� 13%.\"\n" +
                "\t\t]\n" +
                "\t}]\n" +
                "}";
        ImageIdContainer container = Main.parseImageContainer(input);
        assertEquals(62, container.getImageId());
    }

    @Test
    public void test2() throws IOException {
        String input = "{\n" +
                "\t\"name\":\"���� '�����������'\",\n" +
                "\t\"category\":\"hat\",\n" +
                "\t\"description\":\"���������� �������� �� 100 ����\",\n" +
                "\t\"protection\":5,\n" +
                "\t\"lvlreq\":5,\n" +
                "\t\"id\":250,\n" +
                "\t\"imageid\":666\n" +
                "}";
        ImageIdContainer container = Main.parseImageContainer(input);
        assertEquals(666, container.getImageId());
    }
}
