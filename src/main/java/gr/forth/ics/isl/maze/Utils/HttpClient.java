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

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import org.apache.log4j.Logger;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class HttpClient {
    
    private String http_url;
    private static Logger logger = Logger.getLogger(HttpClient.class);
    
    public HttpClient(String url){
        this.http_url = url;
    }
    
    public InputStream getInputStream(){
        try{
            logger.info("Request for: " + this.http_url);
            URL url = new URL(this.http_url);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/xml");
            InputStream inputStream = connection.getInputStream();
            connection.disconnect();
            return inputStream;
        } catch (MalformedURLException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        } catch (IOException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        }
    }
}
