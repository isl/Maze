# Maze #

### 1. Description ###

Mapping Analyzer (Maze) constitutes a web-based tool that undertakes to provide complete management of mappings. Maze works as intermediary between expert users and X3ML language, providing analysis for converting and publishing content as linked data. This tool was implemented in the context of MSc thesis at the University of Crete, School of Sciences and Engineering, Computer Science Department and has been supported by the Foundation for Research and Technology – Hellas (FORTH), Institute of Computer Science (ICS).

### 2. Installation ###

3 Simple Steps: Build - Deploy - Run. 

The folder **src** contains all the files needed to build the web app and create a **war** file. 

This project is a Maven project, providing all the libs in **pom.xml**. You may use any application server that supports war files (recommended: Apache Tomcat).

### 3. Configuration ###

***Client.*** You may configure ServerURL (hosted url), port, Maze’s Rest services URL (url which hosts Maze’s server) and target schema service of 3M.  
Configuration file: [*Maze/src/main/webapp/app/js/Controller.js*]: 

```javascript

var GlobalResources = {
    System :{
        DebugMode : false   //no connection with server at all (only for design purposes)
    },
    Services : {
        ServerURL: 'http://'+window.location.hostname+':8080', //hosted url
        RestService: 'http://'+window.location.hostname+':8080/Maze/webresources', //Maze’s Rest services
        TargetSchemaService:'http://139.91.183.3/3MEditor/FetchBinFile?type=target_info&file=' //target schema service of 3M
    }
};
```


***Server.*** Also you may set services to retrieve sources (i.e. X3ML files). The following file illustrates the default configuration.  
Configuration file: [*Maze/src/main/webapp/WEB-INF/config.properties*]:

```properties

# Maze Configuration file and Resources

#URL to retrieve X3ML from 3M service
Service_X3ML=http://139.91.183.3/3MEditor/Services?method=export&output=text/xml&id=

#URL to retrieve XML file from 3M service
Service_SourceSchema=http://139.91.183.3/3MEditor/FetchBinFile?type=xml_link&file=

#URL to retrieve Target schema file from 3M service
Service_TargetSchema=http://139.91.183.3/3MEditor/FetchBinFile?type=target_info&file=

#URL to retrieve Data records (instances) file from service
Service_DataRecords=http://139.91.183.3/3MEditor/FetchBinFile?type=example_data_target_record&file=

#URL to retrieve Versions of mapping
Service_GetVersions=http://139.91.183.3/3M//GetVersionsList?type=Mapping&id=Mapping

#URL to retrieve X3ML mapping from version collection
Service_VersionedX3ML_Part1=http://139.91.183.3/3MEditor/Services?method=export&output=text/xml&id=
Service_VersionedX3ML_Part2=&version=
```


### 4. Usage ###

You can use this project through:

1. Mapping Memory Manager (3M) – **More** option contains direct links to single mapping analysis (**Analysis**) or comparison of two mappings (**Compare**).  

2. 3M Editor – You may view analysis of your mapping by using the **Analysis** tab and clicking the “*view Analysis*” link.  

3. Home page – Finally, you may use directly the Home page providing the mapping IDs as parameters.


### 5. Contact ###

Anyfantis Nikolaos < nanifant@ics.forth.gr >  
MSc Student of Computer Science Department,  
University of Crete

### 6. License ###

Copyright 2015 Institute of Computer Science, Foundation for Research and Technology - Hellas

Licensed under the EUPL, Version 1.1 or - as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence"); You may not use this work except in compliance with the Licence. You may obtain a copy of the Licence at:

http://ec.europa.eu/idabc/eupl

Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Licence for the specific language governing permissions and limitations under the Licence.

Contact: POBox 1385, Heraklio Crete, GR-700 13 GREECE Tel:+30-2810-391632 Fax: +30-2810-391638 E-mail: isl@ics.forth.gr http://www.ics.forth.gr/isl

Authors : Anyfantis Nikolaos

This file is part of the Mapping Analyzer (Maze) webapp.
