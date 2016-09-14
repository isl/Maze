/*
* Copyright 2015 Institute of Computer Science,
* Foundation for Research and Technology - Hellas
* Licensed under the EUPL, Version 1.1 or - as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
* You may not use this work except in compliance with the Licence.
* You may obtain a copy of the Licence at: http://ec.europa.eu/idabc/eupl
*
* Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the Licence for the specific language governing permissions and limitations under the Licence.
*
* Contact:  POBox 1385, Heraklio Crete, GR-700 13 GREECE
* Tel:+30-2810-391632 Fax: +30-2810-391638 E-mail: isl@ics.forth.gr http://www.ics.forth.gr/isl
*
* Authors : Anyfantis Nikolaos (nanifant 'at' ics 'dot' forth 'dot' gr)
*
* This file is part of the Mapping Analyze (Maze) app.
*/
package gr.forth.ics.isl.maze.Utils;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;
import java.io.*;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLPeerUnverifiedException;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.log4j.Logger;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class HttpsClient {
    
    private String http_url;
    private static Logger logger = Logger.getLogger(HttpsClient.class);
    
    public HttpsClient(String url){
        this.http_url = url;
    }
    
    private TrustManager[ ] get_trust_mgr() {
        TrustManager[ ] certs = new TrustManager[ ] {
            new X509TrustManager() {
                public X509Certificate[ ] getAcceptedIssuers() { return null; }
                public void checkClientTrusted(X509Certificate[ ] certs, String t) { }
                public void checkServerTrusted(X509Certificate[ ] certs, String t) { }
            }
        };
        return certs;
    }
    
    private void print_https_cert(HttpsURLConnection con){
        if(con!=null){
            
            try {
                
                System.out.println("Response Code : " + con.getResponseCode());
                System.out.println("Cipher Suite : " + con.getCipherSuite());
                System.out.println("\n");
                
                Certificate[] certs = con.getServerCertificates();
                for(Certificate cert : certs){
                    System.out.println("Cert Type : " + cert.getType());
                    System.out.println("Cert Hash Code : " + cert.hashCode());
                    System.out.println("Cert Public Key Algorithm : " + cert.getPublicKey().getAlgorithm());
                    System.out.println("Cert Public Key Format : " + cert.getPublicKey().getFormat());
                    System.out.println("\n");
                }
                
                
            } catch (SSLPeerUnverifiedException e) {
                logger.error(e);
            } catch (IOException e){
                logger.error(e);
            }
        }
    }
    
    private void print_content(HttpsURLConnection con){
        if(con!=null){
            
            try {
                
                System.out.println("****** Content of the URL ********");
                
                BufferedReader br =
                        new BufferedReader(
                                new InputStreamReader(con.getInputStream()));
                
                String input;
                
                while ((input = br.readLine()) != null){
                    System.out.println(input);
                }
                br.close();
                
            } catch (IOException e) {
                logger.error(e);
            }
        }
    }
    
    public InputStream getInputStream(){
        logger.info("Request for: " + this.http_url);
        String https_url = this.http_url;
        URL url;
        try {
            
            // Create a context that doesn't check certificates.
            SSLContext ssl_ctx = SSLContext.getInstance("TLS");
            TrustManager[ ] trust_mgr = get_trust_mgr();
            ssl_ctx.init(null,                // key manager
                    trust_mgr,           // trust manager
                    new SecureRandom()); // random number generator
            HttpsURLConnection.setDefaultSSLSocketFactory(ssl_ctx.getSocketFactory());
            
            url = new URL(https_url);
            HttpsURLConnection con = (HttpsURLConnection)url.openConnection();
            
            // Guard against "bad hostname" errors during handshake.
            con.setHostnameVerifier(new HostnameVerifier() {
                public boolean verify(String host, SSLSession sess) {
                    if (host.equals("localhost")) return true;
                    else return false;
                }
            });
            
            if(con!=null){
                try {
                    InputStream is = con.getInputStream();
                    //con.disconnect();
                    return is;
                } catch (IOException e) {
                    logger.error(e);
                    return null;
                }
            }
            return null;
            
        } catch (MalformedURLException e) {
            logger.error(e);
            return null;
        } catch (IOException e) {
            logger.error(e);
            return null;
        }catch (NoSuchAlgorithmException e) {
            logger.error(e);
            return null;
        }catch (KeyManagementException e) {
            logger.error(e);
            return null;
        }
    }
    
    public void testIt(){
        String https_url = this.http_url;
        URL url;
        try {
            
            // Create a context that doesn't check certificates.
            SSLContext ssl_ctx = SSLContext.getInstance("TLS");
            TrustManager[ ] trust_mgr = get_trust_mgr();
            ssl_ctx.init(null,                // key manager
                    trust_mgr,           // trust manager
                    new SecureRandom()); // random number generator
            HttpsURLConnection.setDefaultSSLSocketFactory(ssl_ctx.getSocketFactory());
            
            url = new URL(https_url);
            HttpsURLConnection con = (HttpsURLConnection)url.openConnection();
            
            // Guard against "bad hostname" errors during handshake.
            con.setHostnameVerifier(new HostnameVerifier() {
                public boolean verify(String host, SSLSession sess) {
                    if (host.equals("localhost")) return true;
                    else return false;
                }
            });
            
            //dumpl all cert info
            print_https_cert(con);
            
            //dump all the content
            print_content(con);
            
        } catch (MalformedURLException e) {
            logger.error(e);
        } catch (IOException e) {
            logger.error(e);
        }catch (NoSuchAlgorithmException e) {
            logger.error(e);
        }catch (KeyManagementException e) {
            logger.error(e);
        }
    }
}
