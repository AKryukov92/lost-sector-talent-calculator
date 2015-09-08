import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class RegexpTesting {
    @Before
    public void setUp() {

    }

    @Test
    public void test1() {
        String input = "item1200.png";
        String expression = "item\\d*00\\.png";
        assertTrue(input.matches(expression));
    }

    @Test
    public void test2() {
        String input = "123";
        String expression = "123";
        assertTrue(input.matches(expression));
    }

    @Test
    public void test3() {
        String input = "item1200.png";
        String expression = "(item)(\\d*)(00\\.png)";
        String output = input.replaceAll(expression, "$2");
        assertEquals("12", output);
    }
}
