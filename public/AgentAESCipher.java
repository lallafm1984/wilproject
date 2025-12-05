/*
=====================================================================================================================
=== 기본프로토콜 (서버 <-> 단말)
=====================================================================================================================

요청/응답 기본사항
   - JSON 포맷 사용
   - JSON 내용은 data값 사용
     - data : 요청/응답의 세부내용을 AES128 암호화한 값 
     ex) { "data" : "askldfasdfasdfjklasdfasd;klfjasdkl=" }
   - 암복호화 샘플은 아래쪽 소스 참조

요청 세부내용
   - timeStamp : 현재시간 yyyyMMddHHmmss
     * 요청/응답시 timeStamp값은 10분 이내의 값만 유효값으로 처리
   - at : 빈값
   - pUid : 빈값
   - mUid : 빈값
   - 기타 요청시 필요한 값

API 주소
   개발서버 url : http://tobe-smart2.iptime.org:9995
   운영서버 url : http://laffair.salescube.co.kr
   
   http://tobe-smart2.iptime.org:9995/userExt/checkUserLoginOnlyMo.jspx
   
=====================================================================================================================
=== API
=====================================================================================================================

회원 로그인
   설명 : 로그인 성공시 회원정보를 같이 리턴
   url : /userExt/checkUserLoginOnlyMo.jspx
   요청 data 
      예시 
         암호화전
            {
              "userid": "01011112222",
              "password": "121212",
              "app_install_uid": "",
              "from": "M",
              "at": "",
              "mUid": "",
              "pUid": "",
              "ver": "0.0.1",
              "timeStamp": "20251113154736"
            }
         암호화후 (실제 전송할 값) - data 의 value 가 위 전체를 암호화 한 값
            { "data" : "askldfasdfasdfjklasdfasd;klfjasdkl=" }
   응답 data
      예시 
         복호화후 - 받은값을 복호화하면 확인 가능
            {
               "user_jnum": "20250429",
               "user_sex": "M",
               "userName": "라페어",
               "cloth_size": "L",
               "mbti_type_name": "S",
               "userUid": "USR_250429113111388_8563",
               "at_fix": "jiF95kb6kHUjgZRjvuSdyX8aUiG60npphqibf0ZdEhCJAHogqqfIqIj2E7wJYyZrwt6u6U7Wx6Fa5T0a5hwhzqHN+MDwp2GXuqIv5kXVfsmrAUt9MISfmJGU6d8rTAih",
               "at_mod": "RBIARsGlLVl3Q+Wo1YtptZbZAezJTlNbX7IOjpG9G1UpkZYJSKFgw3A/HPATJOYBhqibf0ZdEhCJAHogqqfIqLvHbJDa/zZ7pr9XPWch61ehfQa5d6uq6PJA69crpKbv",
               "timeStamp": "20251113171756",
               "at": "",
               "result_yne": "Y",
               "result_msg": "36302"
            }
      
=====================================================================================================================
*/

package com.tobesmart.common.util;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

import net.sf.json.JSONObject;

public class AgentAESCipher {

   private static volatile AgentAESCipher INSTANCE;

   final static String secretKey = "9335517002079237";
   final static String IV = "9335517002079237";

   public static AgentAESCipher getInstance() {
      if (INSTANCE == null) {
         synchronized (AgentAESCipher.class) {
            if (INSTANCE == null)
               INSTANCE = new AgentAESCipher();
         }
      }
      return INSTANCE;
   }

   private AgentAESCipher() {

   }

   public static String AES_Encode(String str) throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
         InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {

      byte[] keyData = secretKey.getBytes();

      SecretKey secureKey = new SecretKeySpec(keyData, "AES");

      Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
      c.init(Cipher.ENCRYPT_MODE, secureKey, new IvParameterSpec(IV.getBytes()));

      byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
      String enStr = new String(Base64.encodeBase64(encrypted));

      return enStr;
   }

   public static String AES_Decode(String str) throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
         InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
      byte[] keyData = secretKey.getBytes();
      SecretKey secureKey = new SecretKeySpec(keyData, "AES");
      Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
      c.init(Cipher.DECRYPT_MODE, secureKey, new IvParameterSpec(IV.getBytes("UTF-8")));

      byte[] byteStr = Base64.decodeBase64(str.getBytes());

      return new String(c.doFinal(byteStr), "UTF-8");
   }

   public static void main(String[] args) {

      String certInfos = "";

      certInfos += "{";
      certInfos += " \"date\" : \"" + "2017" + "\", ";
      certInfos += " \"userid\" : \"user12345\", ";
      certInfos += " \"request-count\" : 1, ";
      certInfos += " \"complete-count\" : 2, ";
      certInfos += " \"progress-count\" : 3, ";
      certInfos += " \"cancel-count\" : 4, ";
      certInfos += " \"cert-count\" : 2, ";
      certInfos += "  \"status\" : 1, ";
      certInfos += " \"certs\" : [";
      certInfos += "    {";
      certInfos += "       \"name\" : \"테스트1\",";
      certInfos += "       \"no\" : \"qwer1212\"";
      certInfos += "    },";
      certInfos += "    {";
      certInfos += "       \"name\" : \"테스트2\",";
      certInfos += "       \"no\" : \"qwer1212\" }";
      certInfos += " ]";
      certInfos += "}";

      JSONObject jsonObject = JSONObject.fromObject(certInfos);
      String result = jsonObject.getString("date");
      System.out.println(result);

      // 암호화
      String encValue = "";
      try {
         encValue = AgentAESCipher.AES_Encode(certInfos);
         System.out.println(encValue);

      } catch (Exception e) {
         e.printStackTrace();
      }

      // 복호화
      String plainValue = "";
      try {
         plainValue = AgentAESCipher.AES_Decode(encValue);
         System.out.println(plainValue);

      } catch (Exception e) {
         e.printStackTrace();
      }

   }
}