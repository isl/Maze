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
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Properties;

/**
 * Contains all servers' resources.
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class Resources {
    
    /**
    * URL to retrieve X3ML from service
    */
    private static final String Service_X3ML = "http://139.91.183.3/3MEditor/Services?method=export&output=text/xml&id=";
    /**
    * URL to retrieve XML file from service
    */
    private static final String Service_SourceSchema = "http://139.91.183.3/3MEditor/FetchBinFile?type=xml_link&file=";
    /**
    * URL to retrieve Target schema file from service
    */
    private static final String Service_TargetSchema = "http://139.91.183.3/3MEditor/FetchBinFile?type=target_info&file=";
    /**
    * URL to retrieve Data records (instances) file from service
    */
    private static final String Service_DataRecords = "http://139.91.183.3/3MEditor/FetchBinFile?type=target_info&file=";
    /**
    * URL to retrieve Versions of mapping
    */
    private static final String Service_GetVersions = "http://139.91.183.3/3M//GetVersionsList?type=Mapping&id=Mapping";
    /**
    * URL to retrieve X3ML mapping from version collection
    */
    private static final String Service_VersionedX3ML = "http://139.91.183.3/3MEditor/Services?method=export&output=text/xml&id=";
    
    
    
    
    
    public static boolean getIfHTTPS(){
        boolean PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = false;
        }
        else{
            try{
                PROPERTY = Boolean.parseBoolean(prop.getProperty("Service_X3ML"));
            } catch(Exception e){
                return false;
            }
        }
        return PROPERTY;
    }
    
    public static String getServiceURL_X3ML(){
        String PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = Service_X3ML;
        }
        else{
            PROPERTY = prop.getProperty("Service_X3ML");
        }
        return PROPERTY;
    }
    
    public static String getServiceURL_SourceSchema(){
        String PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = Service_SourceSchema;
        }
        else{
            PROPERTY = prop.getProperty("Service_SourceSchema");
        }
        return PROPERTY;
    }
    
    public static String getServiceURL_TargetSchema(){
        String PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = Service_TargetSchema;
        }
        else{
            PROPERTY = prop.getProperty("Service_TargetSchema");
        }
        return PROPERTY;
    }
    
    public static String getServiceURL_DataRecords(){
        String PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = Service_DataRecords;
        }
        else{
            PROPERTY = prop.getProperty("Service_DataRecords");
        }
        return PROPERTY;
    }
    
    public static String getServiceURL_GetVersions(){
        String PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = Service_GetVersions;
        }
        else{
            PROPERTY = prop.getProperty("Service_GetVersions");
        }
        return PROPERTY;
    }
    
    public static String getServiceURL_VersionedX3ML(String mapID, String versionID){
        String secondPart = "&version=";
        
        String PROPERTY;
        Properties prop = getConfigFile();
        if(prop==null){
            PROPERTY = Service_VersionedX3ML + mapID + secondPart + versionID;
        }
        else{
            PROPERTY = prop.getProperty("Service_VersionedX3ML_Part1") + mapID + prop.getProperty("Service_VersionedX3ML_Part2") + versionID;;
        }
        return PROPERTY;
    }
    
    private static Properties getConfigFile(){
        Properties prop = new Properties();
        InputStream input = null;
        try {
                String propPath = findRelativePathFromRoot("/WEB-INF/");
                input = new FileInputStream(propPath + "/config.properties");

		// load a properties file
		prop.load(input);
	} catch (IOException ex) {
            System.out.println("Cannot read config.properties file.");
            return null;
	} finally {
		if (input != null) {
			try {
				input.close();
			} catch (IOException e) {
                            System.out.println("Cannot read config.properties file.");
                            return null;
			}
		}
	}
        return prop;
    }
    
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
