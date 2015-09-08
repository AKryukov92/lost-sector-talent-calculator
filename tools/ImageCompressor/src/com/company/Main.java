package com.company;

import java.io.File;

public class Main {
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
        try {
            AtlasBuilder builder = new AtlasBuilder(args[0], args[1], args[2], args[3]);
            int atlasHeight = builder.calculateAtlasHeight();
            builder.createBaseImage(AtlasBuilder.ATLAS_WIDTH, atlasHeight);
            builder.fillAtlas();
            builder.saveImageToFile(new File("atlas.png"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
