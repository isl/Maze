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
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFormatter;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.Statement;
import com.hp.hpl.jena.rdf.model.StmtIterator;
import com.hp.hpl.jena.util.iterator.ExtendedIterator;
import gr.forth.ics.isl.maze.Utils.SparQLQueries;
import gr.forth.ics.isl.maze.Utils.Utils;
import java.util.ArrayList;
import org.apache.log4j.Logger;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class TargetRecordsReasoner {
    
    private Logger logger = Logger.getLogger(TargetRecordsReasoner.class);
    private Model base;
    private OntModel baseModel;
    private OntModel fullModel;
    private ArrayList<Individual> individualsList;
    private ArrayList<OntClass> classesList;
    
    public TargetRecordsReasoner(String fileName){
        try{
            if(fileName == null) throw new NullPointerException();
            
            Model curModel = Utils.retreiveTargetRecords_from3M_toBaseOntModel(fileName);
            initReasoner(curModel);
            logger.info("======== Finish Target Records initialization: "+ fileName);
        }
        catch(Exception ex){
            logger.error("Cannot InitModel: "+fileName, ex);
        }
    }
    
    public ArrayList<Individual> getIndividuals(){
        return this.individualsList;
    }
    
    public ArrayList<OntClass> getAllClasses(){
        return this.classesList;
    }
    
    public ArrayList<Property> getOutgoingPropertiesOfIndividual(Individual ind){
        try {
            ArrayList<Property> results = new ArrayList<>();

            StmtIterator iter = ind.listProperties();
            while (iter.hasNext()) {
                Statement st = iter.next();
                Property prop = st.getPredicate();
                results.add(prop);
            }

            return results;
        } catch (Exception ex) {
            logger.error("Cannot find incoming properties of individual.", ex);
            return new ArrayList<>();
        }
    }
    
    public ArrayList<String> getClassTypesOfIndividual(Individual ind){
        try {
            ArrayList<String> results = new ArrayList<>();

            ExtendedIterator classes = ind.listOntClasses(true);
            while (classes.hasNext()) {
                OntClass thisClass = (OntClass) classes.next();
                results.add(thisClass.getURI());
            }

            return results;
        } catch (Exception ex) {
            logger.error("Cannot find class types of individual.", ex);
            return new ArrayList<>();
        }
    }
    
    public ArrayList<Property> getIncomingPropertiesOfIndividual(Individual ind){
        try {
            ArrayList<Property> results = new ArrayList<>();

            Query query = QueryFactory.create(SparQLQueries.GetIncomingProperties(ind));
            QueryExecution qe = QueryExecutionFactory.create(query, this.baseModel);
            ResultSet resultset = qe.execSelect();
            
            while (resultset.hasNext()) { 
                final QuerySolution qs = resultset.next();
                String propURI = qs.get("p").toString();
                Property prop = this.fullModel.getProperty(propURI);
                if(prop != null){
                    results.add(prop);
                }
            }
            //ResultSetFormatter.out(System.out, resultset, query);
            qe.close();

            return results;
        } catch (Exception ex) {
            logger.error("Cannot find outgoing properties of individual.", ex);
            return new ArrayList<>();
        }
    }
    
    public ArrayList<String> getSubjectOfPropertyAndIndividual(Property prop, Individual ind){
        try {
            ArrayList<String> results = new ArrayList<>();

            Query query = QueryFactory.create(SparQLQueries.GetSubjectWithPropertiyAndIndividual(prop, ind));
            QueryExecution qe = QueryExecutionFactory.create(query, this.baseModel);
            ResultSet resultset = qe.execSelect();
            
            while (resultset.hasNext()) { 
                final QuerySolution qs = resultset.next();
                String subjURI = qs.get("s").toString();
                results.add(subjURI);
                //System.out.println(subjURI);
            }
           //ResultSetFormatter.out(System.out, resultset, query);
            qe.close();

            return results;
        } catch (Exception ex) {
            logger.error("Cannot find outgoing properties of individual.", ex);
            return new ArrayList<>();
        }
    }
    
    private void initReasoner(Model model){
        this.base = model;
        this.baseModel = ModelFactory.createOntologyModel( OntModelSpec.RDFS_MEM, this.base );
        this.baseModel.setDerivationLogging(false);
        this.baseModel.setDynamicImports(true);
        this.baseModel.setStrictMode(false); //allows not declared classes
        
        this.fullModel = ModelFactory.createOntologyModel( OntModelSpec.RDFS_MEM_RDFS_INF, this.base );
        this.fullModel.setDynamicImports(true);
        this.fullModel.setDerivationLogging(false);
        
        findAllInstancesAndClasses();
    }
    
    private void findAllInstancesAndClasses(){
        this.individualsList = new ArrayList<>();
        this.classesList = new ArrayList<>();
        
        ExtendedIterator classes = this.fullModel.listClasses();
        while (classes.hasNext()) {
            OntClass thisClass = (OntClass) classes.next();
            String curi = thisClass.getURI();
            
            if(!curi.startsWith("http://www.w3.org")){
                this.classesList.add(thisClass);
                ExtendedIterator instances = thisClass.listInstances();
                while (instances.hasNext()) {
                    Individual thisInstance = (Individual) instances.next();
                    this.individualsList.add(thisInstance);
                }
            }
        }

    }
}
