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
package org.netbeans.rest.application.config;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Nikos
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(gr.forth.ics.isl.mappinganalyzer.restservices.X3mlServices.class);
    }
    
}
