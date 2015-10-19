/*
 * Copyright 2015 Institute of Computer Science,
 *
 * Foundation for Research and Technology - Hellas
 *
 *
 *
 * Licensed under the EUPL, Version 1.1 or - as soon they will be approved
 *
 * by the European Commission - subsequent versions of the EUPL (the "Licence");
 *
 * You may not use this work except in compliance with the Licence.
 *
 * You may obtain a copy of the Licence at:
 *
 *
 *
 * http://ec.europa.eu/idabc/eupl
 *
 *
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 *
 * under the Licence is distributed on an "AS IS" basis,
 *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the Licence for the specific language governing permissions and limitations
 *
 * under the Licence.
 *
 *
 *
 * Contact:  POBox 1385, Heraklio Crete, GR-700 13 GREECE
 *
 * Tel:+30-2810-391632
 *
 * Fax: +30-2810-391638
 *
 * E-mail: isl@ics.forth.gr
 *
 * http://www.ics.forth.gr/isl
 *
 *
 *
 * Authors : Anyfantis Nikolaos
 *
 *
 * This file is part of the Mapping Analyze (Maze) app.
 */
package gr.forth.ics.isl.mappinganalyzer.restservices;

import gr.forth.ics.isl.mappinganalyzer.diff.*;
import gr.forth.ics.isl.mappinganalyzer.singlex3ml.*;
import gr.forth.ics.isl.mappinganalyzer.x3ml.X3ML;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.validation.SchemaFactory;

/**
 * REST Web Service
 *
 * @author Nikos
 */
@Path("x3ml")
public class X3mlServices {

    public X3mlServices() {
    }
    
    
    @GET
    @Path("all")
    @Produces({MediaType.APPLICATION_JSON})
    public X3MLFiles getSX3MLFiles() {
        try {    
            File folder = new File("C:/X3ML_Files/");
            File[] listOfFiles = folder.listFiles();;

            X3MLFiles files = new X3MLFiles();
            files.setFilesNum(listOfFiles.length);

            for(File f: listOfFiles){
                String title = "";
                String id = "";
                X3ML x3ml = unmarshal(f);
                title = x3ml.getInfo().getTitle();
                if(title.equals("")) title="No available title";
                X3mlFileDetails fDetails = new X3mlFileDetails();
                id = f.getName().replaceAll("\\D+","");
                fDetails.setTitle(title);
                fDetails.setX3mlId(id);
                files.getX3MLFiles().add(fDetails);
            }
            return files;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
    
    @GET
    @Path("single/{mapID}")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public X3ML getSingleX3ml(@PathParam("mapID") String mapID) {
        X3ML x3ml = null;
        
        try {
            x3ml = unmarshalWithID(mapID);
            return x3ml;
        } catch (Exception ex) {
           ex.printStackTrace();
           return null; 
        }
    }
    
    @GET
    @Path("findDiff/{file1}/{file2}")
    @Produces({MediaType.APPLICATION_JSON})
    public MappingDiff getx3ml(@PathParam("file1") String file1, @PathParam("file2") String file2) {
        
        X3ML map1 = null;
        X3ML map2 = null;
        try {
            map1 = unmarshalWithID(file1);
            map2 = unmarshalWithID(file2);
            return HelperDiff.findMappings(map1, map2);
        } catch (Exception ex) {
           ex.printStackTrace();
           return null; 
        }
    }
    
    @GET
    @Path("sourceNode/{file1}/{file2}/{source_node}")
    @Produces({MediaType.APPLICATION_JSON})
    public MappingDiff getsourceNodeInfo(@PathParam("file1") String file1, @PathParam("file2") String file2, 
            @PathParam("source_node") String source_node) {
        
        X3ML map1 = null;
        X3ML map2 = null;
        try {
            map1 = unmarshalWithID(file1);
            map2 = unmarshalWithID(file2);
            return HelperDiff.findSourceNodes(map1, map2, source_node);
        } catch (Exception ex) {
           ex.printStackTrace();
           return null; 
        }
    }
    
    
    private X3ML unmarshalWithID(String x3mlID){
        try {
            String uri = "http://139.91.183.3/3MEditor/Services?id="+x3mlID+"&method=export&output=text/xml";
            URL url = new URL(uri);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/xml");
            InputStream xml = connection.getInputStream();
            X3ML map = null;
        
            SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            JAXBContext jc = JAXBContext.newInstance(X3ML.class);
            Unmarshaller unmarshaller = jc.createUnmarshaller();
            map = (X3ML) unmarshaller.unmarshal(xml);
            connection.disconnect();
            return map;
        } catch (JAXBException ex) {
           ex.printStackTrace();
           return null; 
        } catch (MalformedURLException ex) {
            ex.printStackTrace();
            return null; 
        } catch (IOException ex) {
            ex.printStackTrace();
            return null; 
        }
    }
        
    private X3ML unmarshal(File file){
        try {
            X3ML map = null;
            SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            JAXBContext jc = JAXBContext.newInstance(X3ML.class);
            Unmarshaller unmarshaller = jc.createUnmarshaller();
            map = (X3ML) unmarshaller.unmarshal(file);
            return map;
        } catch (JAXBException ex) {
           ex.printStackTrace();
           return null; 
        }
    }
}
