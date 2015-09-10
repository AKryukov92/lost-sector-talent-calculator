import com.company.AtlasBuilder;
import org.junit.Test;

import java.io.File;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CalculateAtlasHeightTest {
    @Test
    public void findFromSingleFile() throws Exception {
        File imageFolder = mock(File.class);
        when(imageFolder.isDirectory()).thenReturn(true);
        when(imageFolder.exists()).thenReturn(true);
        when(imageFolder.listFiles()).thenReturn(new File[] {
                new File("C:\\temp\\1700.png")
        });
        AtlasBuilder builder = new AtlasBuilder(imageFolder, ".*\\\\(\\d*)00\\.png", 1);

        int height = builder.calculateAtlasHeight();
        assertEquals(1, height);
    }

    @Test
    public void findFromMultipleFiles() throws Exception {
        File imageFolder = mock(File.class);
        when(imageFolder.isDirectory()).thenReturn(true);
        when(imageFolder.exists()).thenReturn(true);
        when(imageFolder.listFiles()).thenReturn(new File[] {
                new File("C:\\temp\\100.png"),
                new File("C:\\temp\\4000.png"),
                new File("C:\\temp\\6000.png"),
                new File("C:\\temp\\3000.png"),
                new File("C:\\temp\\2000.png")
        });
        AtlasBuilder builder = new AtlasBuilder(imageFolder, ".*\\\\(\\d*)00\\.png", 1);

        int height = builder.calculateAtlasHeight();
        assertEquals(4, height);
    }
}
