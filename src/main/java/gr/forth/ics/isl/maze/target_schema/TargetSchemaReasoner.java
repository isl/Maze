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
package gr.forth.ics.isl.maze.target_schema;

import java.util.ArrayList;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.ontology.OntProperty;
import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.util.iterator.ExtendedIterator;
import gr.forth.ics.isl.maze.Utils.Utils;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import org.apache.log4j.Level;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import com.hp.hpl.jena.rdf.model.ResIterator;
import com.hp.hpl.jena.rdf.model.impl.PropertyImpl;
import gr.forth.ics.isl.maze.Utils.SparQLQueries;
import gr.forth.ics.isl.maze.target_schema.data.Triangle;
import com.hp.hpl.jena.vocabulary.RDFS;
import com.hp.hpl.jena.vocabulary.RDF;
import com.hp.hpl.jena.rdf.model.StmtIterator;

/**
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class TargetSchemaReasoner {

    private static Logger logger = Logger.getLogger(TargetSchemaReasoner.class);
    private Model base;
    private OntModel baseModel;
    private OntModel fullModel;
    private ArrayList<OntClass> baseModelClassesList;
    private ArrayList<OntClass> fullModelClassesList;
    private ArrayList<OntProperty> baseModelPropList;

    //  Constructors
    //**************
    public TargetSchemaReasoner(String fileName) {
        try {
            if (fileName == null) {
                throw new NullPointerException();
            }

            Model curModel = Utils.retreiveOntology_from3M_toBaseOntModel(fileName);
            initReasoner(curModel);
            logger.info("======== Finish Model initialization: " + fileName);
        } catch (Exception ex) {
            logger.error("Cannot InitModel: " + fileName, ex);
        }
    }

    public TargetSchemaReasoner(Model curModel) {
        //disableLogging();
        try {
            if (curModel == null) {
                throw new NullPointerException();
            }

            initReasoner(curModel);
            logger.info("======== Finish Model initializationfrom Model");
        } catch (Exception ex) {
            logger.error("Cannot InitModel from model", ex);
        }
    }

    //  Setters and Getters
    //*************************
    public Model getBase() {
        return base;
    }

    public void setBase(Model curModel) {
        initReasoner(curModel);
    }

    public ArrayList<OntClass> getModelClassesList(Boolean inference) {
        if (inference) {
            return this.fullModelClassesList;
        } else {
            return this.baseModelClassesList;
        }
    }

    public ArrayList<OntProperty> getModelPropList() {
        return this.baseModelPropList;
    }

    //  UTILS 
    //*************************
    public ArrayList<String> getSubclassesOfClass(OntClass c, Boolean inference) {
        OntModel curModel;
        if (inference) {
            curModel = this.fullModel;
        } else {
            curModel = this.baseModel;
        }

        ArrayList<String> resultsList = new ArrayList<>();
        try {
            ResIterator iterator = curModel.listSubjectsWithProperty(new PropertyImpl("http://www.w3.org/2000/01/rdf-schema#subClassOf"), c);
            while (iterator.hasNext()) {
                String uri = iterator.next().toString();
                if (!uri.equals(c.getURI())) {
                    resultsList.add(uri);
                }
            }
        } catch (NullPointerException ex) {
            logger.error("Null Class when getting subClasses of Class", ex);
        }
        return resultsList;
    }

    public ArrayList<String> getSubpropertiesOfProperty(OntProperty p, Boolean inference) {
        OntModel curModel;
        if (inference) {
            curModel = this.fullModel;
        } else {
            curModel = this.baseModel;
        }

        ArrayList<String> resultsList = new ArrayList<>();
        try {
            ResIterator iterator = curModel.listSubjectsWithProperty(new PropertyImpl("http://www.w3.org/2000/01/rdf-schema#subPropertyOf"), p);
            while (iterator.hasNext()) {
                String uri = iterator.next().toString();
                resultsList.add(uri);
            }
        } catch (NullPointerException ex) {
            logger.error("Null Property when getting subProperties of Property", ex);
        }
        return resultsList;
    }

    public ArrayList<String> getRangeOfProperty(OntProperty p) {
        ArrayList<String> resultsList = new ArrayList<>();
        try {
            ExtendedIterator iter = p.listRange();
            while (iter.hasNext()) {
                resultsList.add(iter.next().toString());
            }

            /*for(String kati:resultsList){
                //System.out.println("listRange: "+kati);
            }*/
        } catch (NullPointerException ex) {
            logger.error("Null Property when getting range", ex);
        }
        return resultsList;
    }

    public ArrayList<String> getDomainOfProperty(OntProperty p) {
        ArrayList<String> resultsList = new ArrayList<>();
        try {
            ExtendedIterator iter = p.listDomain();
            while (iter.hasNext()) {
                resultsList.add(iter.next().toString());
            }

            /*for(String kati:resultsList){
                //System.out.println("listDomain: "+kati);
            }*/
        } catch (NullPointerException ex) {
            logger.error("Null Property when getting domain", ex);
        }
        return resultsList;
    }

    /**
     * Search for triangles for specific class A. A triangle is A->B->C AND
     * C->A.
     *
     * @param clazz OntClass
     * @return list of triangles
     */
    public ArrayList<Triangle> searchForTriangles(OntClass clazz) {
        try {
            ArrayList<Triangle> trianglesList = new ArrayList<>();
            Query query = QueryFactory.create(SparQLQueries.GetTrianglesOfClass(clazz));
            QueryExecution qe = QueryExecutionFactory.create(query, this.baseModel);
            ResultSet resultset = qe.execSelect();

            while (resultset.hasNext()) {
                final QuerySolution qs = resultset.next();
                Triangle triangle = new Triangle();
                triangle.setAB(qs.get("AB").toString());
                triangle.setB(qs.get("B").toString());
                triangle.setBC(qs.get("BC").toString());
                triangle.setC(qs.get("C").toString());
                triangle.setCA(qs.get("CA").toString());
                trianglesList.add(triangle);
            }
            //ResultSetFormatter.out(System.out, resultset, query);
            qe.close();
            return trianglesList;
        } catch (Exception ex) {
            logger.error("Cannot find triangles of Class: " + clazz.getURI(), ex);
            return new ArrayList<>();
        }
    }

    //  Private Functions 
    //*************************
    private void initReasoner(Model model) {
        //disableLogging();
        this.base = model;
        StmtIterator listStatements = model.listStatements(null, RDF.type, RDFS.Class);
        if (listStatements.toList().size() > 0) {
            this.baseModel = ModelFactory.createOntologyModel(OntModelSpec.RDFS_MEM, this.base);
            this.fullModel = ModelFactory.createOntologyModel(OntModelSpec.RDFS_MEM_RDFS_INF, this.base);
        } else {
            this.baseModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM, this.base);
            this.fullModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM_TRANS_INF, this.base);
        }
        this.baseModel.setDerivationLogging(false);
        this.baseModel.setDynamicImports(true);
        this.baseModel.setStrictMode(false); //allows not declared classes

        this.fullModel.setDynamicImports(true);
        this.fullModel.setDerivationLogging(false);

        this.baseModelClassesList = findListOfClasses(Boolean.FALSE);
        this.fullModelClassesList = findListOfClasses(Boolean.TRUE);
        this.baseModelPropList = findListOfProperties(Boolean.FALSE);
        //enableLogging();
    }

    private OntClass findClassWithURI(String uri) {
        for (OntClass oc : this.baseModelClassesList) {
            if (oc.getURI().equals(uri)) {
                return oc;
            }
        }
        return null;
    }

    private ArrayList<OntClass> findListOfClasses(Boolean inference) {
        //disableLogging();

        OntModel curModel;
        if (inference) {
            curModel = this.fullModel;
        } else {
            curModel = this.baseModel;
        }

        ArrayList<OntClass> listClasses = new ArrayList();

        for (OntClass klass : curModel.listClasses().toList()) {
            listClasses.add(klass);
        }
        //remove duplicates
        Set<OntClass> setItems = new LinkedHashSet(listClasses);
        listClasses.clear();
        listClasses.addAll(setItems);
        /*for(OntClass clas: listClasses){
            //System.out.println(clas.toString());
        }*/
        //System.out.println("Total Classes: "+listClasses.size());
        return listClasses;
    }

    private ArrayList<OntProperty> findListOfProperties(Boolean inference) {
        //disableLogging();

        OntModel curModel;
        if (inference) {
            curModel = this.fullModel;
        } else {
            curModel = this.baseModel;
        }

        ArrayList<OntProperty> listProps = new ArrayList();
        for (OntClass klass : curModel.listClasses().toList()) {
            if (klass != null) {
                ExtendedIterator itq = klass.listDeclaredProperties(false);
                while (itq.hasNext()) {
                    OntProperty property = (OntProperty) itq.next();
                    if (property.getDomain() != null) {
                        listProps.add(property);
                    }
                }
            }
        }

        //remove duplicates
        Set<OntProperty> setItems = new LinkedHashSet(listProps);
        listProps.clear();
        listProps.addAll(setItems);

        /*for(OntProperty p: listProps){
            //System.out.println(p.toString());
        }*/
        //System.out.println("Total Properties: "+listProps.size());
        return listProps;
    }

    private static void disableLogging() {
        List<Logger> loggers = Collections.<Logger>list(LogManager.getCurrentLoggers());
        loggers.add(LogManager.getRootLogger());
        for (Logger l : loggers) {
            l.setLevel(Level.OFF);
        }
    }

    private static void enableLogging() {
        List<Logger> loggers = Collections.<Logger>list(LogManager.getCurrentLoggers());
        loggers.add(LogManager.getRootLogger());
        for (Logger l : loggers) {
            l.setLevel(Level.ALL);
        }
    }
}
