import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

function InputMultiSelect({
    id,
    options,
    canSelectAll,
    optionValueKey = 'value',
    optionNameKey = 'name',
    values,
    label,
    onChangeHandler,
    dataKey,
    cssClass,
    addCssClass,
    size = 'small',
    setBottomMargin = true,
    useGroupedOptions = false
}) {
    const {t} = useTranslation();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [maxHeight, setMaxHeight] = useState('auto');
    const dropdownRef = useRef(null);

    let styling = 'btn btn-dropdown-select dropdown-toggle ';

    if (size === 'small') {
        styling += 'btn-sm ';
    }
    if (setBottomMargin) {
        styling += 'mb-1 ';
    }
    if (addCssClass) {
        styling += ' ' + addCssClass;
    }

    useEffect(() => {
        function updateMaxHeight() {
            if (!dropdownRef.current) return;

            const rect = dropdownRef.current.getBoundingClientRect();
            const availableHeight = window.innerHeight - rect.bottom;

            setMaxHeight(`${availableHeight}px`);
        }

        // Update on resize or scroll
        window.addEventListener('resize', updateMaxHeight);
        window.addEventListener('scroll', updateMaxHeight);
        updateMaxHeight();

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateMaxHeight);
            window.removeEventListener('scroll', updateMaxHeight);
        };
    }, []);


    useEffect(() => {
        const allValues = options.reduce((accumulator, option) => {
            if (option.options) {
                accumulator.push(...option.options.map(subOption => subOption[optionValueKey]));
            } else {
                accumulator.push(option[optionValueKey]);
            }
            return accumulator;
        }, []);

        // Check if all options are selected
        setSelectAll(values?.length === allValues.length);

        // Update selected groups based on the values
        const newSelectedGroups = options
            .filter(option => option.options && option.group_name) // Filter only groups
            .reduce((accumulator, group) => {
                const allGroupOptionsSelected = group.options.every(subOption =>
                    values?.includes(subOption[optionValueKey]));
                if (allGroupOptionsSelected) {
                    accumulator.push(group.group_name);
                }
                return accumulator;
            }, []);

        setSelectedGroups(newSelectedGroups);
    }, [values, options]);

    function handleChange(value) {
        if (!onChangeHandler) {
            return;
        }

        const selectedValues = values ? [...values] : [];
        const index = selectedValues.indexOf(value);

        if (index < 0) {
            selectedValues.push(value);
        } else {
            selectedValues.splice(index, 1);
        }

        // Determine if all options are selected
        const allOptions = options.reduce((accumulator, option) => {
            if (option.options && option.group_name) {
                // Grouped options
                accumulator.push(...option.options.map(subOption => subOption[optionValueKey]));
            } else {
                // Single options
                accumulator.push(option[optionValueKey]);
            }
            return accumulator;
        }, []);

        setSelectAll(selectedValues.length === allOptions.length);

        // Update groups based on whether all their options are selected
        const newSelectedGroups = options
            .filter(option => option.options && option.group_name) // Filter only groups
            .reduce((accumulator, group) => {
                const allGroupOptionsSelected = group.options.every(subOption =>
                    selectedValues.includes(subOption[optionValueKey]));
                if (allGroupOptionsSelected) {
                    accumulator.push(group.group_name);
                }
                return accumulator;
            }, []);

        setSelectedGroups(newSelectedGroups);
        onChangeHandler(selectedValues, dataKey);
    }

    function handleSelectGroup(group) {
        if (!onChangeHandler) {
            return;
        }

        const newSelectedGroups = [...selectedGroups];
        const selectedValues = [...(values ?? [])];
        const index = newSelectedGroups.indexOf(group);

        // Find the group in the options.
        const groupOptions = options.find(option => option.group_name === group);

        if (index < 0) {
            // Add the group
            newSelectedGroups.push(group);

            // Add all options in this group to the values array
            groupOptions?.options?.forEach(option => {
                if (!selectedValues.includes(option[optionValueKey])) {
                    selectedValues.push(option[optionValueKey]);
                }
            });
        } else {
            // Remove the group
            newSelectedGroups.splice(index, 1);

            // Remove all options in this group from the values array
            groupOptions?.options?.forEach(option => {
                const valueIndex = selectedValues.indexOf(option[optionValueKey]);
                if (valueIndex >= 0) {
                    selectedValues.splice(valueIndex, 1);
                }
            });
        }

        // Update the selected groups and values state
        setSelectedGroups(newSelectedGroups);
        onChangeHandler(selectedValues, dataKey);
    }

    function handleSelectAll() {
        if (!onChangeHandler) {
            return;
        }

        const selected = !selectAll;
        setSelectAll(selected);

        const newValues = [];
        const newSelectedGroups = [];

        if (selected) {
            // If selecting all, iterate over all options and add every option value to the newValues array
            // Also add every group to the newSelectedGroups array
            options.forEach(option => {
                if (option.options && option.group_name) {
                    // This is a group with sub-options
                    newSelectedGroups.push(option.group_name);
                    option.options.forEach(subOption => {
                        newValues.push(subOption[optionValueKey]);
                    });
                } else {
                    // This is a single option
                    newValues.push(option[optionValueKey]);
                }
            });
        }
        // If deselecting, both newValues and newSelectedGroups remain empty

        // Update both the values and selectedGroups state
        setSelectedGroups(newSelectedGroups);
        onChangeHandler(newValues, dataKey);
    }

    function renderOption(value, name) {
        return (
            <li className="form-check" key={value}>
                <input className="form-check-input" type="checkbox"
                       id={id + '-' + value}
                       value={value}
                       onChange={() => handleChange(value)}
                       checked={values?.length > 0 ? values.includes(value) : false}
                />
                <label className="form-check-label" htmlFor={id + '-' + value}>
                    {name}
                </label>
            </li>
        )
    }

    function renderSelectGroupOption(group) {
        return (
            <li className="form-check" key={group}>
                <input className="form-check-input" type="checkbox"
                       id={id + '-group-' + group}
                       value={group}
                       onChange={() => handleSelectGroup(group)}
                       checked={selectedGroups.includes(group)}
                />
                <label className="form-check-label fw-bold" htmlFor={id + '-group-' + group}>
                    {group}
                </label>
            </li>
        )
    }

    function renderSelectAllOption() {
        return (
            <li className="form-check" key={id + '-select-all'}>
                <input className="form-check-input" type="checkbox"
                       id={id + '-select-all'}
                       checked={selectAll}
                       onChange={handleSelectAll}
                />
                <label className="form-check-label" htmlFor={id + '-select-all'}>
                    {t('general.select_all')}
                </label>
            </li>
        )
    }

    function renderOptions() {
        return (
            <>
                {options?.length > 0 && options.map((option) => {
                    return renderOption(option[optionValueKey], option[optionNameKey])
                })}
            </>
        )
    }

    function renderGroupedOptions() {
        return (
            <>
                {options?.length > 0 && options.map((option) => {
                    if (option.group_name && option.options) {
                        return (
                            <>
                                { renderSelectGroupOption(option.group_name) }
                                {option?.options?.length > 0 && option?.options?.map((option) => {
                                    return renderOption(option[optionValueKey], option[optionNameKey])
                                })}
                            </>
                        )
                    } else {
                        return renderOption(option[optionValueKey], option[optionNameKey])
                    }
                })}
            </>
        )
    }

    return(
        <div className="btn-group">
            <button
                ref={dropdownRef}
                className={ cssClass ?? styling }
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                {label} {values?.length > 0 && '('+values?.length+')'}
            </button>
            <ul className="dropdown-menu dropdown-menu-select"
                style={{
                    maxHeight: maxHeight,
                    overflowY: 'auto'
                }}>
                {canSelectAll && renderSelectAllOption()}
                { useGroupedOptions ? renderGroupedOptions() : renderOptions() }
            </ul>
        </div>
    )
}

export default InputMultiSelect
