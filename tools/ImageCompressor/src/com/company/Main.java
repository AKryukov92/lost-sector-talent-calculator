package com.company;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {
    private static ObjectMapper mapper;
    /*
    Valid usage:
    ImageCompressor c:\temp\js c:\temp\images image 00.png
    */
    public static void main(String[] args) {
        if (args.length < 4) {
            System.out.println("Specify arguments:\n" +
            "\tpath to folder with data\n" +
            "\tpath to folder with associated images\n" +
            "\timage filename prefix\n" +
            "\timage filename postfix");
            return;
        }
        File dataFolder = new File(args[0]),
                imageFolder = new File(args[1]);
        if (!dataFolder.exists()) {
            System.out.println("Folder with data do not exist");
            return;
        }
        if (!dataFolder.isDirectory()) {
            System.out.println("Path to data is not a folder");
            return;
        }
        if (!imageFolder.exists()) {
            System.out.println("Folder with images do not exist");
            return;
        }
        if (!imageFolder.isDirectory()) {
            System.out.println("Path to images is not a folder");
            return;
        }
        String imagePrefix = args[2], imagePostfix = args[3];
        for (File file : dataFolder.listFiles()) {
            if (file.isDirectory()){
                continue;
            }
            try {
                String fileContent = getDataFileContents(file);
                ImageIdContainer container = parseImageContainer(fileContent);
            } catch (IOException e) {
                System.out.println("Error while reading file " + file.getName());
                continue;
            }
        }
    }

    public static String getDataFileContents(File file) throws IOException {
        FileInputStream fis = null;
        fis = new FileInputStream(file);
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
