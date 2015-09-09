package com.company;

import java.io.File;

public class Main {
    /*
    Valid usage:
    ImageCompressor c:\temp\talents .*\\(\d*)g00\.png
    ImageCompressor c:\temp\talents .*\\(\d*)00\.png
    ImageCompressor c:\temp\items .*\\item(\d*)00\.png
    */
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Specify arguments:\n" +
            "\tpath to folder with images\n" +
            "\tregexp to extract image id from name");
            return;
        }
        try {
            AtlasBuilder builder = new AtlasBuilder(new File(args[0]), args[1]);
            int atlasHeight = builder.calculateAtlasHeight();
            builder.createBaseImage(AtlasBuilder.ATLAS_WIDTH, atlasHeight);
            builder.fillAtlas();
            builder.saveImageToFile(new File("atlas.png"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
