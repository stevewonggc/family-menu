package com.eateverything.familymenu.entity.http;

import java.io.Serializable;

/**
 * @author Steve Wang.
 * @since 22 Nov, 2018 5:12 PM
 */
public class CommonResponse implements Serializable {
  private String code;
  private String message;
  private Object result;

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Object getResult() {
    return result;
  }

  public void setResult(Object result) {
    this.result = result;
  }
}
