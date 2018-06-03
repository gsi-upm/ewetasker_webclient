import { Channel } from '../../model/Channel';
import { Parameter } from '../../model/Parameter';
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