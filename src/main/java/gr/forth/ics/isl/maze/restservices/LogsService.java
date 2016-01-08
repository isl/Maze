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
package gr.forth.ics.isl.maze.restservices;

import gr.forth.ics.isl.maze.Resources;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.apache.log4j.Logger;

/**
 * REST Web Service
 *
 * @author Anyfantis Nikos (nanifant 'at' ics 'dot' forth 'dot' gr)
 */
@Path("logs")
public class LogsService {

    private static Logger logger = Logger.getLogger(LogsService.class);

    /**
     * Creates a new instance of LogsService
     */
    public LogsService() {
    }

    /**
     * Downloads Log file from Maze Server
     * @return an instance of javax.ws.rs.core.Response;
     */
    @GET
    @Path("/get")
    @Produces("text/plain")
    public Response downloadLogFile() {
        try{
            String path = Resources.findRelativePathFromRoot("/WEB-INF/logs/maze-logfile.log");
            File file = new File(path);
            ResponseBuilder response = Response.ok((Object) file);
            response.header("Content-Disposition",
                    "attachment; filename=\"maze-logfile.log\"");
            return response.build();
        }
        catch(Exception ex){
            logger.error("Cannot retreive log file",ex);
            ResponseBuilder response = Response.status(Response.Status.NOT_FOUND);
            response.entity("[Maze-Logs] Sorry, cannot retreive log file!");
            return response.build();
        }
    }
    
    /**
     * Shows Log file from Maze Server
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/show")
    @Produces("text/plain")
    public String showLogFile() {
        try {
            String path = Resources.findRelativePathFromRoot("/WEB-INF/logs/maze-logfile.log");
            StringBuilder resultBldr = new StringBuilder();
            
            String line;
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path), "UTF-8"));
            while ((line = br.readLine()) != null) {
                resultBldr.append(line).append("\n");
            }
            return resultBldr.toString();
        } catch (Exception ex) {
            logger.error("Cannot retreive log file", ex);
            return "[Maze-Logs] Sorry, cannot retreive log file!";
        }
    }
}
