import React from "react";
import Autosuggest from "react-autosuggest";
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  "ga",
  "it",
  "ja",
  "kn",
  "ko",
  "la",
  "lv",
  "lt",
  "mk",
  "ms",
  "mt",
  "no",
  "fa",
  "pl",
  "pt",
  "ro",
  "ru",
  "sr",
  "sk",
  "sl",
  "es",
  "sw",
  "sv",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "ur",
  "vi",
  "cy",
  "yi",
  "af",
  "sq",
  "ar",
  "az",
  "eu",
  "bn",
  "be",
  "bg",
  "ca",
  "zh-CN",
  "zh-TW",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "tl",
  "fi",
  "fr",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "iw",
  "hi",
  "hu",
  "is",
  "id"
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  console.log(value);
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? languages
    : languages.filter(
        lang => lang.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
  console.log(suggestion);
  return suggestion;
};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion}</div>;

class Example extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.props.onChange(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: languages
    });
  };

  render() {
    const { suggestions } = this.state;
    const { value } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type language",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Example;
