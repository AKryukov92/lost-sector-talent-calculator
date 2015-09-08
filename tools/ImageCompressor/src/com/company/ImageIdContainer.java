package com.company;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageIdContainer {
    @JsonProperty("id")
    private int id;
    @JsonProperty("imageid")
    private int imageid;

    public static int ILLEGAL_ID = -1;

    public ImageIdContainer() {
        id = ILLEGAL_ID;
        imageid = ILLEGAL_ID;
    }

    public int getImageId() {
        if (imageid != ILLEGAL_ID) {
            return imageid;
        }
        return id;
    }
}
