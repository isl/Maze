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

import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.util.HashSet;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import gr.forth.ics.isl.maze.Resources;
import java.io.Reader;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import javax.xml.xpath.*;
import org.apache.log4j.Logger;
import org.w3c.dom.*;

/**
 * Provides helpers and functions for retrieving files from 3M service.
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class Utils {
    private static Logger logger = Logger.getLogger(Utils.class);
    
    /**
     * Unmarshal an X3ML file from 3M
     * @param x3mlID
     * @return an X3ML Instance
     */
    public static X3ML unmarshal_X3ML_WithID(String x3mlID) {
        try {
            String uri = Resources.getServiceURL_X3ML() + x3mlID;
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            Reader reader = new InputStreamReader(inputStream,"UTF-8");
            InputSource is = new InputSource(reader);
            is.setEncoding("UTF-8");
            
            //SchemaFactory sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            JAXBContext jc = JAXBContext.newInstance(X3ML.class);
            Unmarshaller unmarshaller = jc.createUnmarshaller();
            X3ML x3ml = (X3ML) unmarshaller.unmarshal(is);
            return x3ml;
        } catch (JAXBException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        } catch (IOException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        }
    }
    
    /**
     * Gets X3ML file and converts to Document(xml).
     * @param x3mlID String X3ML Id
     * @return Document Document(xml)of X3ML
     */
    public static Document retreiveX3MLfile_toXML(String x3mlID){
        try {
            String uri = Resources.getServiceURL_X3ML() + x3mlID;
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            dbf.setValidating(false);
            dbf.setIgnoringComments(true);
            dbf.setIgnoringElementContentWhitespace(true);
            dbf.setNamespaceAware(true);
            DocumentBuilder db = null;
            db = dbf.newDocumentBuilder();
            db.setEntityResolver(new NullResolver());
            
            Reader reader = new InputStreamReader(inputStream,"UTF-8");
            InputSource is = new InputSource(reader);
            is.setEncoding("UTF-8");
            
            Document x3ml = db.parse(is);
            return x3ml;
        } catch (MalformedURLException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        } catch (IOException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        } catch (SAXException | ParserConfigurationException ex) {
            logger.error("Cannot retreive X3ML file form Service",ex);
            return null;
        }
    }
    
    /**
     * Gets source schema file and converts to Document(xml) from 3M service.
     * @param filename String file name
     * @return Document Document(xml)of X3ML
     */
    public static Document retreiveSourceSchema_from3M_toXML(String filename){
        try {
            String uri = Resources.getServiceURL_SourceSchema() + URLEncoder.encode(filename, "UTF-8");
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            
            Document doc = convert_InputStream_toXML(inputStream);
            return doc;
        } catch (IOException ex) {
            logger.error("Cannot retreive file form 3M Service",ex);
            return null;
        } catch (SAXException | ParserConfigurationException ex) {
            logger.error("Cannot convert Input Stream to Document",ex);
            return null;
        }
    }
    
    /**
     * Gets versions from 3M service.
     * @param MappingId String mapping id
     * @return Document Document(xml)
     */
    public static Document retreiveVersions_from3M_toXML(String MappingId){
        try {
            String uri = Resources.getServiceURL_GetVersions() + MappingId;
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            
            Document doc = convert_InputStream_toXML(inputStream);
            return doc;
        } catch (IOException ex) {
            logger.error("Cannot retreive versions file form 3M Service",ex);
            return null;
        } catch (SAXException | ParserConfigurationException ex) {
            logger.error("Cannot convert Input Stream to Document for versions",ex);
            return null;
        }
    }
    
    /**
     * Gets versioned X3ML from 3M service.
     * @param MappingId String mapping id
     * @param VersionId String version id
     * @return Document Document(xml)
     */
    public static Document retreiveVersionX3ML_from3M_toXML(String MappingId, String VersionId){
        try {
            String uri = Resources.getServiceURL_VersionedX3ML(MappingId, VersionId);
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            
            Document doc = convert_InputStream_toXML(inputStream);
            return doc;
        } catch (IOException ex) {
            logger.error("Cannot retreive versioned X3ML form 3M Service",ex);
            return null;
        } catch (SAXException | ParserConfigurationException ex) {
            logger.error("Cannot convert Input Stream to Document for versions",ex);
            return null;
        }
    }
    
    /**
     * Gets target schema file and converts to Model from 3M service.
     * @param filename String file name
     * @return Model from constructor: ModelFactory.createDefaultModel().
     */
    public static Model retreiveOntology_from3M_toBaseOntModel(String filename){
        try {
            String uri = Resources.getServiceURL_TargetSchema() + URLEncoder.encode(filename, "UTF-8");
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            
            final Model base = ModelFactory.createDefaultModel();
            base.read(inputStream, null);
            
            return base;
        } catch (Exception ex) {
            logger.error("Cannot retreive target file form 3M Service ("+filename+")",ex);
            return null;
        } 
    }
    
    /**
     * Gets target records file and converts to Model from 3M service.
     * @param filename String file name
     * @return Model from constructor: ModelFactory.createDefaultModel().
     */
    public static Model retreiveDataRecords_from3M_toBaseOntModel(String filename){
        try {
            String uri = Resources.getServiceURL_DataRecords() + URLEncoder.encode(filename, "UTF-8");
            InputStream inputStream;
            if(Resources.getIfHTTPS()){
                HttpsClient https = new HttpsClient(uri);
                inputStream = https.getInputStream();
            }
            else{
                HttpClient http = new HttpClient(uri);
                inputStream = http.getInputStream();
            }
            
            final Model base = ModelFactory.createDefaultModel();
            base.read(inputStream, null);
            
            return base;
        } catch (Exception ex) {
            logger.error("Cannot retreive target record file form 3M Service ("+filename+")",ex);
            return null;
        } 
    }
    
    /**
     * Converts an InputStream to String.
     * @param is InputStream the input is
     * @return String output.
     */
    public static String convert_InputStream_toString(InputStream is) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();
        String line;
        try {
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException ex) {
            logger.error("Cannot convert input stream to string",ex);
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    logger.error("Cannot close BufferedReader",e);
                }
            }
        }
        return sb.toString();
    }
    
    /**
     * Converts an InputStream to Document (XML).
     * @param is InputStream the input is
     * @return Document output.
     */
    public static Document convert_InputStream_toXML(InputStream is) throws SAXException, IOException, ParserConfigurationException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

        dbf.setValidating(false);
        dbf.setIgnoringComments(false);
        dbf.setIgnoringElementContentWhitespace(true);
        dbf.setNamespaceAware(true);
        
        DocumentBuilder db = null;
        db = dbf.newDocumentBuilder();
        db.setEntityResolver(new NullResolver());

        return db.parse(is);
    }
    
    /**
     * Removes duplicates for arrayList of strings.
     * @param list ArrayList of strings
     * @return Document output.
     */
    public static ArrayList<String> removeDublicatesFromArrayList(ArrayList<String> list){
        //Remove Dublicates in lists
        Set<String> hs = new HashSet<>();
        hs.addAll(list);
        list.clear();
        list.addAll(hs);
        return list;
    }
    
    /**
     * Order an X3ML document in the XML form
     * @param unsortedDoc Document
     * @return Document sorted doc.
     */
    public static Document sortX3MLDoument(Document unsortedDoc){
        try{

            HashMap<Node, String> mappingsMap = new HashMap<>();
            HashMap<Element, String> mappingsELEMMap = new HashMap<>();
            
            ArrayList<String> mappingSourceNodes = new ArrayList<>();
            NodeList mappings = unsortedDoc.getElementsByTagName("mapping");
            for (int i = 0; i < mappings.getLength(); i++) {
                Node mapping = mappings.item(i);
                
                XPath xpath = XPathFactory.newInstance().newXPath();
                XPathExpression expr = xpath.compile("./domain/source_node/text()");
                
                Object result = expr.evaluate(mapping, XPathConstants.NODESET);
                NodeList nodes = (NodeList) result;
                for (int j = 0; j < nodes.getLength(); j++) {
                    mappingSourceNodes.add(nodes.item(j).getNodeValue() + i);
                    mappingsMap.put(mapping, nodes.item(j).getNodeValue() + i);
                }
            }
            
            
            for (Map.Entry<Node, String> entry : mappingsMap.entrySet()) {
                Node linkNode = entry.getKey();
                Element linkElem = (Element) linkNode;
                String VALUE = entry.getValue();
                
                HashMap<Node, String> linksMap = new HashMap<>();
                ArrayList<String> linkSourceNodes = new ArrayList<>();
                Node domain = linkElem.getElementsByTagName("domain").item(0);
                Element domainElem = (Element) domain;
                
                NodeList links = linkElem.getElementsByTagName("link");
                for (int i = 0; i < links.getLength(); i++) {
                    Node link = links.item(i);
                    
                    XPath xpath = XPathFactory.newInstance().newXPath();
                    XPathExpression expr = xpath.compile("./path/source_relation/relation/text()");
                    
                    Object result = expr.evaluate(link, XPathConstants.NODESET);
                    NodeList nodes = (NodeList) result;
                    for (int j = 0; j < nodes.getLength(); j++) {
                        linkSourceNodes.add(nodes.item(j).getNodeValue() + i);
                        linksMap.put(link, nodes.item(j).getNodeValue() + i);
                    }
                }
                
                Collections.sort(linkSourceNodes, new Comparator<String>() {
                    @Override
                    public int compare(String s1, String s2) {
                        return s1.compareToIgnoreCase(s2);
                    }
                });
                
                Element newMapping = unsortedDoc.createElement("mapping");
                newMapping.appendChild(domainElem);
                for (String sn : linkSourceNodes) {
                    for (Map.Entry<Node, String> entryLink : linksMap.entrySet()) {
                        Node key = entryLink.getKey();
                        String value = entryLink.getValue();
                        if (sn.equals(value)) {
                            Element lElem = (Element) key;
                            newMapping.appendChild(lElem);
                        }
                    }
                }
                
                mappingsELEMMap.put(newMapping, VALUE);
            }
            
            Collections.sort(mappingSourceNodes, new Comparator<String>() {
                @Override
                public int compare(String s1, String s2) {
                    return s1.compareToIgnoreCase(s2);
                }
            });
            
            Element newMappigns = unsortedDoc.createElement("mappings");
            for (String sn : mappingSourceNodes) {
                for (Map.Entry<Element, String> entry : mappingsELEMMap.entrySet()) {
                    Element key = entry.getKey();
                    String value = entry.getValue();
                    if (sn.equals(value)) {
                        newMappigns.appendChild(key);
                    }
                }
            }
            
            Element root = unsortedDoc.getDocumentElement();
            Element oldMappigns = (Element)root.getElementsByTagName("mappings").item(0);
            
            root.replaceChild(newMappigns, oldMappigns);
            
            return unsortedDoc;
        }
        catch(Exception ex){
            logger.fatal("Cannot order document of X3ML.", ex);
            return unsortedDoc;
        }
    }
    
    public static void removeAllChildrenOfNode(Node node) 
    {
        for (int i = 0; i < node.getChildNodes().getLength(); i++) {
            Node n = node.getChildNodes().item(i);
        
            if(n.hasChildNodes()) //edit to remove children of children
            {
              removeAllChildrenOfNode(n);
              node.removeChild(n);
            }
            else
              node.removeChild(n);
        }
    }
    
    //Custom Class
    static class NullResolver implements EntityResolver {
        public InputSource resolveEntity(String publicId, String systemId) throws SAXException, IOException {
            return new InputSource(new StringReader(""));
        }
    }
}
