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
package gr.forth.ics.isl.mappinganalyzer.diff;

import java.io.File;
import java.io.IOException;
import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.custommonkey.xmlunit.DetailedDiff;
import org.custommonkey.xmlunit.XMLUnit;
//import org.custommonkey.xmlunit.DetailedDiff;
//import org.custommonkey.xmlunit.XMLUnit;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

/**
 *
 * @author Nikos
 */
public class LoadMapping {
    
    public static void main(String[] args) {
        
        Document map1 = loadXML("C:/X3ML_Files/MappingCoin1.xml");
        Document map2 = loadXML("C:/X3ML_Files/MappingCoin2.xml");
        
        //XMLUnit.setIgnoreWhitespace(true);
        //XMLUnit.setIgnoreAttributeOrder(true);
        
        
        DetailedDiff diff = new DetailedDiff(XMLUnit.compareXML(map1, map2));

        List<?> allDifferences = diff.getAllDifferences();
        for(Object o: allDifferences){
            System.out.println(o.toString());
        }
        System.out.println("Differences found: "+ diff.toString()+" "+ allDifferences.size());
    
    }
    
    private static Document loadXML(String path){
        try {
            File fXmlFile = new File(path);
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(fXmlFile);
            return doc;
        } catch (ParserConfigurationException | SAXException | IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
