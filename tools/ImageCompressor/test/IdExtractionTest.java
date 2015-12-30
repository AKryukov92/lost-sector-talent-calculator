import com.company.AtlasBuilder;
import org.junit.Before;
import org.junit.Test;

import java.io.File;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class IdExtractionTest {
    public File imageFolder;

    @Before
    public void setUp() {
        imageFolder = mock(File.class);
        when(imageFolder.isDirectory()).thenReturn(true);
        when(imageFolder.listFiles()).thenReturn(new File[] {new File(""), new File("")});
        when(imageFolder.exists()).thenReturn(true);
    }

    @Test
    public void parseExampleItem() throws Exception {
        String input = "C:\\temp\\item1200.png";
        AtlasBuilder builder = new AtlasBuilder(imageFolder, ".*\\\\item(\\d*)00\\.png", 1);
        int id = builder.getIdFromFilename(input);
        assertEquals(12, id);
    }

    @Test
    public void parseExampleTalent() throws Exception {
        String input = "C:\\temp\\1700.png";
        AtlasBuilder builder = new AtlasBuilder(imageFolder, ".*\\\\(\\d*)00\\.png", 1);
        int id = builder.getIdFromFilename(input);
        assertEquals(17, id);
    }

    @Test
    public void parseExampleInactiveTalent() throws Exception {
        String input = "C:\\temp\\19g00.png";
        AtlasBuilder builder = new AtlasBuilder(imageFolder, ".*\\\\(\\d*)g00\\.png", 1);
        int id = builder.getIdFromFilename(input);
        assertEquals(19, id);
    }

    @Test
    public void parseFilename() throws Exception {
        String input = "C:\\temp\\4000.png";
        AtlasBuilder builder = new AtlasBuilder(imageFolder, ".*\\\\(\\d*)00\\.png", 1);
        int id = builder.getIdFromFilename(input);
        assertEquals(40, id);
    }
}
