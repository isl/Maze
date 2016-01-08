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

import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.rdf.model.Property;

/**
 *This Class Generates SparQL queries as strings
 * 
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
public class SparQLQueries {
    
    /**
    * Default prefix for RDFS
    */
    private static final String RDFS_Prefix = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
    /**
    * Default prefix for RDF
    */
    private static final String RDF_Prefix = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n";
    
        
    /**
     * Returns a SparQL query for triangles of class.
     * @param clazz OntClass
     * @return String SparQL query
     */
    public static String GetTrianglesOfClass(OntClass clazz){
        String classURI = clazz.getURI();
        
        String query = RDFS_Prefix + RDF_Prefix
                + "SELECT DISTINCT ?AB ?B ?BC ?C ?CA \n"
                + "WHERE{ \n"
                + "     ?AB rdfs:domain <" + classURI + ">. \n"
                + "     ?AB rdfs:range ?B. \n"
                + "     ?BC rdfs:domain ?B. \n"
                + "     ?BC rdfs:range ?C. \n"
                + "     ?CA rdfs:domain ?C. \n"
                + "     ?CA rdfs:range <" + classURI + ">. \n"
                + "     FILTER ( \n"
                + "         <" + classURI + "> != ?B \n"
                + "         && <" + classURI + "> != ?C \n"
                + "         && ?B != ?C \n"
                + "     )"
                + "}";
        
        return query;
    }
    
    /**
     * Returns a SparQL query for getting incoming properties of Individual.
     * @param ind Individual
     * @return String SparQL query
     */
    public static String GetIncomingProperties(Individual ind){
        String indURI = ind.getURI();
        
        String query = RDFS_Prefix + RDF_Prefix
                + "SELECT ?p \n"
                + "WHERE{ \n"
                + "     ?s ?p <" + indURI + ">. \n"    
                + "}";
        
        return query;
    }
    
    /**
     * Returns a SparQL query for getting subject with
     * property and Individual.
     * @param prop Property
     * @param ind Individual
     * @return String SparQL query
     */
    public static String GetSubjectWithPropertiyAndIndividual(Property prop, Individual ind){
        String propURI = prop.getURI();
        String indURI = ind.getURI();
        
        String query = RDFS_Prefix + RDF_Prefix
                + "SELECT ?s \n"
                + "WHERE{ \n"
                + "     ?s <" + propURI + "> <" + indURI + ">. \n"    
                + "}";
        
        return query;
    }
}
