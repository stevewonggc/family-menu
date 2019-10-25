package com.eateverything.familymenu.controller;

import com.eateverything.familymenu.services.StorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.util.stream.Collectors;



/**
 * @author Steve Wang.
 * @since 22 Nov, 2018 1:50 PM
 */
@Controller
@RequestMapping("/files")
public class UploadController {

  @Autowired
  private StorageService storageService;

  @GetMapping("/")
  public String listUploadedFiles(Model model) throws IOException {

    model.addAttribute("files", storageService.loadAll().map(
        path -> MvcUriComponentsBuilder.fromMethodName(UploadController.class,
                                                       "serveFile", path.getFileName().toString()).build().toString())
                                              .collect(Collectors.toList()));

    return "uploadForm";
  }

  @GetMapping("/files/{filename:.+}")
  @ResponseBody
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

    Resource file = storageService.loadAsResource(filename);
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                                      "attachment; filename=\"" + file.getFilename() + "\"").body(file);
  }

  @PutMapping
  @ResponseBody
  public String handleFileUpload(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) {
    System.out.println(name);
    storageService.store(file);

    return "OK";
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<?> handleStorageFileNotFound(RuntimeException exc) {
    return ResponseEntity.notFound().build();
  }
}
