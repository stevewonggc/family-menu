package com.eateverything.familymenu.services;

import com.eateverything.familymenu.controller.StorageProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

@Service
public class FileSystemStorageService implements StorageService {

  private final Path rootLocation;

  @PostConstruct
  public void afterProperties() {
    this.init();
  }

  @Autowired
  public FileSystemStorageService(StorageProperties properties) {
    this.rootLocation = Paths.get(properties.getLocation());
  }

  @Override
  public String store(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new RuntimeException("Failed to store empty file " + file.getOriginalFilename());
      }
      String[] resolvedName = file.getOriginalFilename().split("\\.");
      String suffix = resolvedName[resolvedName.length - 1];
      String name = UUID.randomUUID().toString() + "." + suffix;

      Files.copy(file.getInputStream(), this.rootLocation.resolve(name));
      return name;
    } catch (IOException e) {
      throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
    }
  }

  @Override
  public Stream<Path> loadAll() {
    try {
      return Files.walk(this.rootLocation, 1)
                  .filter(path -> !path.equals(this.rootLocation))
                  .map(path -> this.rootLocation.relativize(path));
    } catch (IOException e) {
      throw new RuntimeException("Failed to read stored files", e);
    }

  }

  @Override
  public Path load(String filename) {
    return rootLocation.resolve(filename);
  }

  @Override
  public Resource loadAsResource(String filename) {
    try {
      Path file = load(filename);
      Resource resource = new UrlResource(file.toUri());
      if(resource.exists() || resource.isReadable()) {
        return resource;
      }
      else {
        throw new RuntimeException("Could not read file: " + filename);

      }
    } catch (MalformedURLException e) {
      throw new RuntimeException("Could not read file: " + filename, e);
    }
  }

  @Override
  public void deleteAll() {
    FileSystemUtils.deleteRecursively(rootLocation.toFile());
  }

  @Override
  public void init() {
    if(! Files.exists(rootLocation)) {
      try {
        Files.createDirectory(rootLocation);
      } catch (IOException e) {
        throw new RuntimeException("Could not initialize storage", e);
      }
    }
  }
}