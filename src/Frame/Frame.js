import * as regeneratorRuntime from 'regenerator-runtime';

import { appDiscovered } from "../core/messages";
import { Channel, STATE_INVALID } from '../channel'

export function Frame(frame) {
    const channels = [ ];

    class Frame {
        constructor() { 
            this.unsubscribeAppDiscovery = appDiscovered.subscribe({ next: ({frame: value, appName}) => {
                if (value === frame) {
                    Object.defineProperty(this, 'appName', { value: appName, writable: false, enumerable: true, configurable: true });
                }
            } });
        }
    
        get isCommunicationEnabled() {
            return !!this.appName;
        }

        channel = name => channels.find(channel => channel.name === name);

        get openedChannels() { 
            const opened = channels
                .filter(channel => channel.isOpened)
                .map(channel => channel.name);
            return opened;
        };
    
        defineChannel = (config) => {
            const configuration = config;
            configuration.frameWindow = frame;
            const newChannel = new Channel(this, configuration);
            if (newChannel.isValid) {
                channels.push(newChannel);
            }
        }

        openChannel = async (name) => {
            const channel = this.channel(name);
            if (channel) {
                return await channel.open();
            } else {
                throw new Error('Not found');
            }
        }

        closeChannel = async (name) => {
            const channel = this.channel(name);
            if (channel) {
                return await channel.close();
            } else {
                throw new Error('Not found');
            }
        }
    }
    return new Frame();
} 
