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
package gr.forth.ics.isl.maze.instance;

import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.util.iterator.ExtendedIterator;
import gr.forth.ics.isl.maze.instance.data.InstanceRecord;
import gr.forth.ics.isl.maze.instance.data.Instances;
import gr.forth.ics.isl.maze.instance.data.PropertyInstance;
import gr.forth.ics.isl.maze.target_schema.data.TS_Class;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class Instances_Generator {
    
    private Instances allInstancesData;
    private TargetRecordsReasoner reasoner;
    
    public Instances createInstancesData(String fileName){
        
        this.allInstancesData = new Instances();
        this.reasoner = new TargetRecordsReasoner(fileName);
        
        saveInstances();
        saveClasses();
        
        return this.allInstancesData;
    }

    private void saveInstances() {
        
        for(Individual i : this.reasoner.getIndividuals()){
            
            InstanceRecord instance = new InstanceRecord();
            instance.setUri(i.getURI());
            instance.setLabel(i.getLabel(null));
            
            //SET OUTGOING PROPERTIES
            for(Property p : this.reasoner.getOutgoingPropertiesOfIndividual(i)){
                ExtendedIterator iter = i.listPropertyValues(p);
                while (iter.hasNext()) {
                    PropertyInstance prop = new PropertyInstance();
                    prop.setUri(p.getURI());
                    String label = p.getURI().replace(p.getNameSpace(), "");
                    prop.setLabel(label);
                    
                    RDFNode obj = (RDFNode)iter.next();
                    if(obj.isLiteral()){
                        prop.setType("literal");
                        prop.setResource(obj.asLiteral().getString());
                    }
                    else if(obj.isResource()){
                        prop.setType("resource");
                        prop.setResource(obj.asResource().getURI());
                    }
                    
                    instance.addOutgoingProperty(prop);
                }
            }
            
            //SET INCOMING PROPERTIES
            for(Property p : this.reasoner.getIncomingPropertiesOfIndividual(i)){
                for(String s : this.reasoner.getSubjectOfPropertyAndIndividual(p, i)){
                    PropertyInstance prop = new PropertyInstance();
                    prop.setUri(p.getURI());
                    String label = p.getURI().replace(p.getNameSpace(), "");
                    prop.setLabel(label);
                    prop.setType("resource");
                    prop.setResource(s);
                    instance.addIncomingProperty(prop);
                }
            }
            
            instance.setTypeClass(this.reasoner.getClassTypesOfIndividual(i));
            this.allInstancesData.addInstance(instance);
        }
        
    }

    private void saveClasses() {
        for(OntClass c : this.reasoner.getAllClasses()){
            
            TS_Class clazz = new TS_Class();
            clazz.setUri(c.getURI());
            String label = c.getURI().replace(c.getNameSpace(), "");
            clazz.setLabel(label);
            clazz.setNamespace(c.getNameSpace());
            
            this.allInstancesData.addClass(clazz);
        }
    }
    
    
    
    
}
