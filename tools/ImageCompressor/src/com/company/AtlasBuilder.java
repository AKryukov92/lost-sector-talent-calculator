package com.company;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class AtlasBuilder {
    private File dataFolder;
    private File imageFolder;
    private String imagePrefix;
    private String imagePostfix;
    private File[] dataFiles;
    private File[] imageFiles;
    private static ObjectMapper mapper;
    private BufferedImage atlas;
    private Graphics2D graphics;

    public static int FRAGMENT_SIZE = 48;
    public static int ATLAS_WIDTH = 20;

    public AtlasBuilder(String dataFolderPath, String imageFolderPath, String imagePrefix, String imagePostfix) throws Exception {
        if (dataFolderPath == null || dataFolderPath.isEmpty()) {
            throw new Exception("Data folder was not specified");
        }
        if (imageFolderPath == null || imageFolderPath.isEmpty()) {
            throw new Exception("Image folder was not specified");
        }

        dataFolder = new File(dataFolderPath);
        if (!dataFolder.exists()) {
            throw new Exception("Folder with data do not exist");
        }
        if (!dataFolder.isDirectory()) {
            throw new Exception("Path to data is not a folder");
        }
        dataFiles = dataFolder.listFiles();
        if (dataFiles == null) {
            throw new Exception("Folder with data is empty");
        }

        imageFolder = new File(imageFolderPath);
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

        this.imagePrefix = imagePrefix;
        this.imagePostfix = imagePostfix;
    }

    public int calculateAtlasHeight() {
        int maxImageId = ImageIdContainer.ILLEGAL_ID;

        for (File file : dataFiles) {
            if (file.isDirectory()){
                continue;
            }
            ImageIdContainer container;
            try {
                String fileContent = getDataFileContents(file);
                container = parseImageContainer(fileContent);
            } catch (IOException e) {
                System.out.println("Error processing file " + file.getName());
                continue;
            }
            if (container.getImageId() > maxImageId) {
                maxImageId = container.getImageId();
            }
        }
        return maxImageId;
    }

    public void createBaseImage(int atlasWidth, int atlasHeight) {
        atlas = new BufferedImage(atlasWidth * FRAGMENT_SIZE, atlasHeight * FRAGMENT_SIZE, BufferedImage.TYPE_INT_ARGB);
        graphics = atlas.createGraphics();
    }

    public void fillAtlas() {
        if (graphics == null) {
            return;
        }
        for (File file : dataFiles) {
            if (file.isDirectory()){
                continue;
            }
            ImageIdContainer container;
            try {
                String fileContent = getDataFileContents(file);
                container = parseImageContainer(fileContent);
            } catch (IOException e) {
                System.out.println("Error processing file " + file.getName());
                continue;
            }
            try {
                BufferedImage image = loadImage(imageFolder.getPath() + "\\" + imagePrefix + container.getImageId() + imagePostfix);
                blitImageToAtlas(image, container.getImageId()/20, container.getImageId()%20);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
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

    public static ImageIdContainer parseImageContainer(String text) throws IOException {
        if (text == null) {
            return null;
        }
        if (mapper == null) {
            mapper = new ObjectMapper();
        }
        return mapper.readValue(text, ImageIdContainer.class);
    }
}
