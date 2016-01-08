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
import gr.forth.ics.isl.maze.Utils.Utils;
import gr.forth.ics.isl.maze.instance.TargetRecordsReasoner;
import gr.forth.ics.isl.maze.mapping_rules.ERMappingRules_Generator;
import gr.forth.ics.isl.maze.target_schema.TargetSchemaReasoner;
import gr.forth.ics.isl.maze.x3ml.Entity;
import gr.forth.ics.isl.maze.x3ml.Link;
import gr.forth.ics.isl.maze.x3ml.Mapping;
import gr.forth.ics.isl.maze.x3ml.X3ML;
import java.util.List;
import org.w3c.dom.Document;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class DraftTests {
    
    
    public static void main(String[] args) {
        
        //testReasoner();
        //testMappingRules_ER();
        //testTriangles();
        testTargetRecordReasoner();
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
        Document scDoc = Utils.retreiveFile_from3M_toXML(xmlName);
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
}
