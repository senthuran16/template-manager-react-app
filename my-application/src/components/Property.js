import React from 'react';
// import './index.css';
// Material-UI
import TextField from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';

class Property extends React.Component {
    handleSelectChange = name => event => {
        // Update the selected content in state
        let state = this.state
        state['value'] = event.target.value
        this.setState(state)
        // Return selected value to the parent to store
        this.props.onValueChange(event.target.value)
    }
    handleTextChange = name => event => {
        // Update the selected content in state
        let state = this.state
        state['value'] = event.target.value
        this.setState(state)
        // Return selected value to the parent to store
        this.props.onValueChange(event.target.value)
    }

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            fieldName: props.fieldName,
            description: props.description,
            // Display initial value when iniitializing
            // Initial value is :
            // - Default value, when the form is in create mode
            // - Already selected value, when the form is in edit mode
            value: props.initialValue,
            type: props.type,
            options: props.options
        };
        // Update initial value for each property in the form
        props.onValueChange(props.initialValue)
    }

    // Renders each Property either as a TextField or Radio Group, with default values and elements as specified
    render() {
        // If there are options specified, it is a dropdown
        if (this.state.options) {
            const options = this.state.options.map((option) => (
                <MenuItem key={option} name={option} value={option}>{option}</MenuItem>))
            return (
                <div>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor={this.state.name}>{this.state.fieldName}</InputLabel>
                        <Select
                            value={this.state.value}
                            onChange={this.handleSelectChange(this.state.name)}
                            input={<Input id={this.state.name}/>}
                        >
                            {options}
                        </Select>
                        <FormHelperText>{this.state.description}</FormHelperText>
                    </FormControl>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                    <TextField
                        required
                        id={this.state.name}
                        name={this.state.name}
                        label={this.state.fieldName}
                        defaultValue={this.state.value}
                        helperText={this.state.description}
                        margin="normal"
                        onChange={this.handleTextChange(this.state.name)}
                    />
                    <br/>
                </div>
            );
        }
    }
}

export default Property;
