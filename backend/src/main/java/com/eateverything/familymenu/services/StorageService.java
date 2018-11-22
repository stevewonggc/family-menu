package com.eateverything.familymenu.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;


/**
 * @author Steve Wang.
 * @since 22 Nov, 2018 1:52 PM
 */
public interface StorageService {
  void init();

  String store(MultipartFile file);

  Stream<Path> loadAll();

  Path load(String filename);

  Resource loadAsResource(String filename);

  void deleteAll();
}
