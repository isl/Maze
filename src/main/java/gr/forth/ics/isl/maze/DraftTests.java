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

import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntProperty;
import com.hp.hpl.jena.rdf.model.Property;
import gr.forth.ics.isl.maze.Utils.HttpsClient;
import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.instance.TargetRecordsReasoner;
import gr.forth.ics.isl.maze.mapping_rules.ERMappingRules_Generator;
import gr.forth.ics.isl.maze.target_schema.TargetSchemaReasoner;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import java.net.URL;
/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class DraftTests {
    
    
    public static void main(String[] args) {
        
        //testReasoner();
        //testMappingRules_ER();
        //testTriangles();
        //testTargetRecordReasoner();
        //testVersions();
        //test_unmarshal_X3ML_WithID("103");
        //testHttpsClient();
    }
    
    private static void testHttpsClient(){
        String url = "https://mapping-d-parthenos.d4science.org/3MEditor/Services?method=export&output=text/xml&id=103";
        HttpsClient client = new HttpsClient(url);
        client.testIt();
    }
        
    private static void testReasoner(){
        TargetSchemaReasoner reasoner = new TargetSchemaReasoner("CRMdig_v3.2.rdfs");

        for (OntProperty p : reasoner.getModelPropList()) {
            if (p.getURI().equals("http://www.cidoc-crm.org/cidoc-crm/P1_is_identified_by")) {
                System.out.println("====== NO REASONER ==== ");
                for (String sp : reasoner.getSubpropertiesOfProperty(p, Boolean.FALSE)) {
                    System.out.println(sp);
                }

                System.out.println("====== WITH REASONER ==== ");
                for (String sp : reasoner.getSubpropertiesOfProperty(p, Boolean.TRUE)) {
                    System.out.println(sp);
                }
            }
            System.out.println(p.getURI());
        }

        System.out.println("============================================================= ");

        for (OntClass c : reasoner.getModelClassesList(Boolean.FALSE)) {
            if (c.getURI().equals("http://www.ics.forth.gr/isl/CRMdig/D10_Software_Execution")) {
                System.out.println("====== NO REASONER ==== ");
                for (String sc : reasoner.getSubclassesOfClass(c, Boolean.FALSE)) {
                    System.out.println(sc);
                }

                System.out.println("====== WITH REASONER ==== ");
                for (String sc : reasoner.getSubclassesOfClass(c, Boolean.TRUE)) {
                    System.out.println(sc);
                }
            }
        }

        System.out.println("================ ALL CLASSES ================= ");
        for (OntClass c : reasoner.getModelClassesList(Boolean.FALSE)) {
            System.out.println(c.getURI());
        }
    }
    
    private static void testMappingRules_ER(){
        
        X3ML x3ml = Utils.unmarshal_X3ML_WithID("434");
        String xmlName = x3ml.getInfo().getExampleDataInfo().getExampleDataSourceRecord().getXmlLink();
        Document scDoc = Utils.retreiveSourceSchema_from3M_toXML(xmlName);
        ERMappingRules_Generator erRuleGen = new ERMappingRules_Generator();
        erRuleGen.createERMappingRules(x3ml, scDoc);
        
    }
    
    private static void testTriangles(){
        
        TargetSchemaReasoner reasoner = new TargetSchemaReasoner("cidoc_crm_v6.0-draft-2015January.rdfs");
        
        for (OntClass c : reasoner.getModelClassesList(Boolean.FALSE)) {
            reasoner.searchForTriangles(c);
        }
        
    }
    
    private static void testTargetRecordReasoner(){
        
        TargetRecordsReasoner reasoner = new TargetRecordsReasoner("2coins_rdf___15-03-2015160422___13655.xml");
        for(Individual i : reasoner.getIndividuals()){
            System.out.println(i.getURI());
            for(Property p : reasoner.getIncomingPropertiesOfIndividual(i)){
                reasoner.getSubjectOfPropertyAndIndividual(p, i);
            }
        }
    }

    private static void testVersions() {
        try {
            String url = "http://139.91.183.3/3MEditor/Services?method=export&output=text/xml&id=209&version=1";
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse(new URL(url).openStream());
            printDocument(doc, System.out);
        } catch (ParserConfigurationException ex) {
            Logger.getLogger(DraftTests.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SAXException ex) {
            Logger.getLogger(DraftTests.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DraftTests.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TransformerException ex) {
            Logger.getLogger(DraftTests.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void printDocument(Document doc, OutputStream out) throws IOException, TransformerException {
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = tf.newTransformer();
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
        transformer.setOutputProperty(OutputKeys.METHOD, "xml");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

        transformer.transform(new DOMSource(doc), 
             new StreamResult(new OutputStreamWriter(out, "UTF-8")));

    }
}
