import { Channel } from '../../model/Channel';
import { Parameter } from '../../model/Parameter';
import { Action } from '../../model/Action';
import { Event } from '../../model/Event';

import axios from 'axios';

export function getChannels(){
    const request = axios.get('http://localhost:5050/channels/base')
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

                    var outputParameters = action["output_parameters"].map(function (parameter){
                        var parameterObj = new Parameter();
                        parameterObj.id = parameter["@id"];
                        parameterObj.label = parameter["rdfs:label"];
                        parameterObj.comment = parameter["rdfs:comment"];
                        return parameterObj;
                    });

                    actionObj.outputParameters = outputParameters;

                    return actionObj;
                });

                var events = channel["events"].map(function (event){
                    var eventnObj = new Event();
                    eventnObj.id = event["@id"];
                    eventnObj.label = event["rdfs:label"];
                    eventnObj.comment = event["rdfs:comment"];
                    eventnObj.logo = channel["foaf:logo"];

                    var outputParameters = event["output_parameters"].map(function (parameter){
                        var parameterObj = new Parameter();
                        parameterObj.id = parameter["@id"];
                        parameterObj.label = parameter["rdfs:label"];
                        parameterObj.comment = parameter["rdfs:comment"];
                        return parameterObj;
                    });

                    eventnObj.outputParameters = outputParameters;

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
    const request = axios.get('http://localhost:5050/channels/category/' + category_uri)
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
    const request = axios.get('http://localhost:5050/channels/custom/category/' + category_uri)
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

export function getCustomSubChannels(channel_uri){
    const request = axios.get('http://localhost:5050/channels/custom/base_channel/' + channel_uri)
        .then(function (response){
            var channels = response.data.channels.map(function (channel){
                var channelObj = new Channel();
                channelObj.id = channel["@id"];
                channelObj.label = channel["rdfs:label"];
                channelObj.comment = channel["rdfs:comment"];
                var parameters = channel["parameters"].map(function (parameter){
                    var parameterObj = new Parameter();
                    parameterObj.id = parameter["@id"];
                    parameterObj.label = parameter["rdfs:label"];
                    parameterObj.comment = parameter["rdfs:comment"];
                    parameterObj.datatype = parameter["rdf:datatype"];
                    parameterObj.value = parameter["rdf:value"];
                    parameterObj.type = parameter["rdf:type"];
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
        
    const request = axios.post('http://localhost:5050/channels/import', {
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
    const request = axios.delete('http://localhost:5050/channels/custom/delete/' + channel_uri)
        .then(function (response){
            return response.status === 200;
        })
        .catch(function (error){
            console.log(error)
        })
    return request;
}


export function createNewRule(label, comment, eventSubchannels, actionSubchannels){

    var eventsJson = [];
    var actionsJson = [];
    //var baseLastIndex = channel.id.lastIndexOf("/");
    //const base = channel.id.substr(0, baseLastIndex+1);

    for(const subchannel of eventSubchannels){
        var parameters = [];
        for(const param of subchannel.parameters){
            // TODO: Select operation
            parameters.push({
                "@id" : param.id,
                "rdf:type" : param.type,
                "rdf:value" : param.value,
                "operation" : "string:equalIgnoringCase"
            })
        }

        for(const param of subchannel.selectedEvent.outputParameters){
            // TODO: Select operation
            parameters.push({
                "@id" : param.id,
                "rdf:type" : param.id,
                "rdf:value" : param.value,
                "operation" : "string:equalIgnoringCase"
            })
        }

        eventsJson.push({
            "@id" : subchannel.selectedEvent.id,
            "parameters" : parameters
        })
    }

    for(const subchannel of actionSubchannels){
        var parameters = [];
        for(const param of subchannel.parameters){
            // TODO: Select operation
            parameters.push({
                "@id" : param.id,
                "rdfs:label" : param.label,
                "rdf:type" : param.type,
                "rdf:value" : param.value,
                "output" : false,
                "operation" : "string:equalIgnoringCase"
            })
        }

        for(const param of subchannel.selectedAction.outputParameters){
            // TODO: Select operation
            parameters.push({
                "@id" : param.id,
                "rdfs:label" : param.label,
                "rdf:type" : param.id,
                "rdf:value" : param.value,
                "output" : true,
                "operation" : "string:equalIgnoringCase"
            })
        }

        actionsJson.push({
            "@id" : subchannel.selectedAction.id,
            "rdfs:label" : subchannel.selectedAction.label,
            "parameters" : parameters
        })
    }

    /*for(const event of events){

        //for(const param of event.par)
        eventsJson.push({
            "@id" : event.id,
            "parameters" : []
        });
    }*/
        
    const request = axios.post('http://localhost:5050/rules/new', {
        "@context" : {
            "@vocab" : "http://gsi.dit.upm.es/ontologies/ewe/ns/"
        },
        "rdfs:label" : label,
        "rdfs:comment" : comment,
        "events" : eventsJson,
        "actions" : actionsJson
    })
    .then(function(response){
        return response.status === 200;
    })
    .catch(function (error){
        console.log(error)
    });

    return request;
}