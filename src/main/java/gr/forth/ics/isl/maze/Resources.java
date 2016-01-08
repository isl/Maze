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
package gr.forth.ics.isl.maze;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * Contains all servers' resources.
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class Resources {
    
    /**
    * URL to retrieve X3ML from service
    */
    public static final String Service_X3ML = "http://139.91.183.3/3MEditor/Services?method=export&output=text/xml&id=";
    /**
    * URL to retrieve XML file from service
    */
    public static final String Service_XML = "http://139.91.183.3/3MEditor/FetchBinFile?type=xml_link&file=";
    /**
    * URL to retrieve Target schema file from service
    */
    public static final String Service_TargetSchema = "http://139.91.183.3/3MEditor/FetchBinFile?type=target_info&file=";
    
    /**
    * This method is used to find relative path from root.
    * @param filepath String file path.
    * @return String This returns full path including input path.
    */
    public static String findRelativePathFromRoot(String filepath) throws UnsupportedEncodingException{
        String path = Resources.class.getResource("").getPath();
        String fullPath = URLDecoder.decode(path, "UTF-8");
        String pathArr[] = fullPath.split("/WEB-INF/classes/");
        fullPath = pathArr[0] + filepath;
        String reponsePath = new File(fullPath).getPath();
        return reponsePath;
    }
}
