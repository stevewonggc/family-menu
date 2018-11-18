package com.eateverything.familymenu.entity.db;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Menu {

    private String name;
    private List<String> parts;
    private String url;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getParts() {
        return parts;
    }

    public void setParts(List<String> parts) {
        this.parts = parts;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
