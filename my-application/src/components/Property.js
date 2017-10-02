import React from 'react';
// import './index.css';
// Material-UI
import TextField from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';

class Property extends React.Component {
    /**
     * Handles onChange action of a TextField or a Select
     * @param name
     */
    handleOnChange = name => event => {
        this.props.onValueChange(event.target.value)
    }

    // Renders each Property either as a TextField or Radio Group, with default values and elements as specified
    render() {
        // If there are options specified, it is a dropdown
        if (this.props.options) {
            var options = this.props.options.map((option) => (
                <MenuItem key={option} name={option} value={option}>{option}</MenuItem>))
            return (
                <div>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor={this.props.name}>{this.props.fieldName}</InputLabel>
                        <Select
                            value={this.props.value}
                            onChange={this.handleOnChange(this.props.name)}
                            input={<Input id={this.props.name}/>}
                        >
                            {options}
                        </Select>
                        <FormHelperText>{this.props.description}</FormHelperText>
                    </FormControl>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                    <TextField
                        required
                        id={this.props.name}
                        name={this.props.name}
                        label={this.props.fieldName}
                        value={this.props.value}
                        helperText={this.props.description}
                        margin="normal"
                        onChange={this.handleOnChange(this.props.name)}
                    />
                    <br/>
                </div>
            );
        }
    }
}

export default Property;
