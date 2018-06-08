import { Channel } from '../../model/Channel';
import { Parameter } from '../../model/Parameter';
import { Action } from '../../model/Action';
import { Event } from '../../model/Event';

import axios from 'axios';

export function getChannels(){
    const request = axios.get('http://localhost:5000/channels/base')
        .then(function (response){
            var channels = response.data.channels.map(function (channel){
                var channelObj = new Channel();
                channelObj.id = channel["@id"];
                channelObj.label = channel["rdfs:label"];
                channelObj.comment = channel["rdfs:comment"];
                channelObj.logo = channel["foaf:logo"];
                
                var parameters = channel["parameters"].map(function (parameter){
                    var parameterObj = new Parameter();
                    parameterObj.id = parameter["@id"];
                    parameterObj.label = parameter["rdfs:label"];
                    parameterObj.comment = parameter["rdfs:comment"];
                    return parameterObj;
                });

                var actions = channel["actions"].map(function (action){
                    var actionObj = new Action();
                    actionObj.id = action["@id"];
                    actionObj.label = action["rdfs:label"];
                    actionObj.comment = action["rdfs:comment"];
                    actionObj.logo = channel["foaf:logo"];
                    return actionObj;
                });

                var events = channel["events"].map(function (event){
                    var eventnObj = new Event();
                    eventnObj.id = event["@id"];
                    eventnObj.label = event["rdfs:label"];
                    eventnObj.comment = event["rdfs:comment"];
                    eventnObj.logo = channel["foaf:logo"];
                    return eventnObj;
                });


                channelObj.parameters = parameters;
                channelObj.events = events;
                channelObj.actions = actions;

                return channelObj;
            });
            return channels;
        })
        .catch(function (error){
            console.log(error)
        })
    return request;
}

export function getCategoryChannels(category_uri){
    const request = axios.get('http://localhost:5000/channels/category/' + category_uri)
        .then(function (response){
            var channels = response.data.channels.map(function (channel){
                var channelObj = new Channel();
                channelObj.id = channel["@id"];
                channelObj.label = channel["rdfs:label"];
                channelObj.comment = channel["rdfs:comment"];
                channelObj.logo = channel["foaf:logo"];
                var parameters = channel["parameters"].map(function (parameter){
                    var parameterObj = new Parameter();
                    parameterObj.id = parameter["@id"];
                    parameterObj.label = parameter["rdfs:label"];
                    parameterObj.comment = parameter["rdfs:comment"];
                    parameterObj.datatype = parameter["rdf:datatype"];
                    return parameterObj;
                });
                channelObj.parameters = parameters;
                return channelObj;
            });
            return channels;
        })
        .catch(function (error){
            console.log(error)
        })
    return request;
}

export function getCustomCategoryChannels(category_uri){
    const request = axios.get('http://localhost:5000/channels/custom/category/' + category_uri)
        .then(function (response){
            var channels = response.data.channels.map(function (channel){
                var channelObj = new Channel();
                channelObj.id = channel["@id"];
                channelObj.label = channel["rdfs:label"];
                channelObj.comment = channel["rdfs:comment"];
                channelObj.type = channel["rdf:type"];
                channelObj.logo = channel["foaf:logo"];
                var parameters = channel["parameters"].map(function (parameter){
                    var parameterObj = new Parameter();
                    parameterObj.id = parameter["@id"];
                    parameterObj.label = parameter["rdfs:label"];
                    parameterObj.comment = parameter["rdfs:comment"];
                    parameterObj.datatype = parameter["rdf:datatype"];
                    parameterObj.value = parameter["rdf:value"];
                    return parameterObj;
                });
                channelObj.parameters = parameters;
                return channelObj;
            });
            return channels;
        })
        .catch(function (error){
            console.log(error)
        })
    return request;
}

export function importChannel(channel){

    var parameters = [];
    var baseLastIndex = channel.id.lastIndexOf("/");
    const base = channel.id.substr(0, baseLastIndex+1);

    for(const param of channel.parameters){
        parameters.push({
            "rdfs:label" : param.label,
            "rdf:type" : param.id,
            "rdf:value" : param.value
        });
    }
        
    const request = axios.post('http://localhost:5000/channels/import', {
        "@context" : {
            "@base" : base,
            "@vocab" : "http://gsi.dit.upm.es/ontologies/ewe/ns/"
        },
        "rdfs:label" : channel.label,
        "rdfs:comment" : channel.comment,
        "rdf:type" : channel.id,
        "parameters" : parameters
    })
    .then(function(response){
        return response.status === 200;
    })
    .catch(function (error){
        console.log(error)
    });

    return request;
}

export function deleteCustomChannel(channel_uri){
    const request = axios.delete('http://localhost:5000/channels/custom/delete/' + channel_uri)
        .then(function (response){
            return response.status === 200;
        })
        .catch(function (error){
            console.log(error)
        })
    return request;
}