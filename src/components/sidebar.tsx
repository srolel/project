import React, { ChangeEvent } from "react"
import { observer } from "mobx-react"
import * as styles from './styles/index.css';
import Component from './component';
import { ISocket } from '../stores/models/socket';

class Sidebar extends Component {
    onSocketNameChange = (socket: ISocket) => (e: ChangeEvent<HTMLInputElement>) => {
        socket.setName(e.target.value);
    };

    getSocketInput = (s: ISocket) => {
        return <input onChange={this.onSocketNameChange(s)} defaultValue={s.name} key={s.id} />;
    };

    onAddSocket = (type: 'input' | 'output') => () => {
        const {selection} = this.store;
        if (selection) {
            selection.addSocket(type);
        }
    };

    render() {
        const { selection } = this.store
        return selection ? (
            <div className={`${styles.sidebar} ${styles.sidebarOpen}`}>
                inputs: <button onClick={this.onAddSocket('input')}>+</button>
                {selection.inputs.map(this.getSocketInput)}
                    < hr />
                outputs: <button onClick={this.onAddSocket('output')}>+</button>
                {selection.outputs.map(this.getSocketInput)}
                {/* <input onChange={this.onChange} value={selection.name} /> */}
            </div>
        ) : (
                <div className={styles.sidebar} />
            )
    }
}

export default observer(Sidebar)
