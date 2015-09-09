package com.company;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AtlasBuilder {
    public static int ILLEGAL_ID = -1;
    private Pattern regex;
    private File[] imageFiles;
    private BufferedImage atlas;
    private Graphics2D graphics;

    public static int FRAGMENT_SIZE = 48;
    public static int ATLAS_WIDTH = 20;

    public AtlasBuilder(File imageFolder, String filenameExpression) throws Exception {
        if (imageFolder == null) {
            throw new Exception("Image folder was not specified");
        }
        if (!imageFolder.exists()) {
            throw new Exception("Folder with images do not exist");
        }
        if (!imageFolder.isDirectory()) {
            throw new Exception("Path to images is not a folder");
        }
        imageFiles = imageFolder.listFiles();
        if (imageFiles == null) {
            throw new Exception("Folder with images is empty");
        }

        if (filenameExpression == null) {
            throw new Exception("Regexp should not be empty");
        }
        if (filenameExpression.isEmpty()) {
            throw new Exception("Regexp should not be empty");
        }
        regex = Pattern.compile(filenameExpression);
    }

    public int calculateAtlasHeight() {
        int maxImageId = ILLEGAL_ID;

        for (File file : imageFiles) {
            if (file.isDirectory()){
                continue;
            }
            int tempId = getIdFromFilename(file.getAbsolutePath());
            if (tempId != ILLEGAL_ID) {
                if (maxImageId < tempId) {
                    maxImageId = tempId;
                }
            }
        }
        return maxImageId / 20 + 1;
    }

    public void createBaseImage(int atlasWidth, int atlasHeight) {
        atlas = new BufferedImage(atlasWidth * FRAGMENT_SIZE, atlasHeight * FRAGMENT_SIZE, BufferedImage.TYPE_INT_ARGB);
        graphics = atlas.createGraphics();
    }

    public void fillAtlas() {
        if (graphics == null) {
            return;
        }
        for (File file : imageFiles) {
            try {
                BufferedImage image = loadImage(file.getAbsolutePath());
                int tempId = getIdFromFilename(file.getAbsolutePath());
                blitImageToAtlas(image, tempId%20, tempId/20);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }

    public int getIdFromFilename(String imageFilename) {
        Matcher matcher = regex.matcher(imageFilename);
        if (matcher.matches()) {
            return Integer.parseInt(matcher.group(1));
        } else {
            return ILLEGAL_ID;
        }
    }

    public BufferedImage loadImage(String filename) throws Exception {
        if (filename == null || filename.isEmpty()) {
            throw new Exception("Trying to load image with empty filename");
        }

        File imageFile = new File(filename);
        if (!imageFile.exists()) {
            throw new Exception("Image named: " + filename + " do not exist");
        }
        return ImageIO.read(imageFile);
    }

    public void blitImageToAtlas(BufferedImage image, int x, int y) {
        if (graphics == null) {
            return;
        }
        graphics.drawImage(image, x*FRAGMENT_SIZE, y*FRAGMENT_SIZE, FRAGMENT_SIZE, FRAGMENT_SIZE, null);
    }

    public void saveImageToFile(File destination) throws IOException {
        if (atlas == null) {
            return;
        }
        if (destination == null) {
            return;
        }
        ImageIO.write(atlas, "png", destination);
    }

    public static String getDataFileContents(File file) throws IOException {
        FileInputStream fis = new FileInputStream(file);
        byte[] data = new byte[(int) file.length()];
        fis.read(data);
        fis.close();
        return new String(data, "UTF-8");
    }
}
