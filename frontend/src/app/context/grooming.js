'use client';

import { createContext, useState, useEffect, useContext } from 'react';

import Swal from 'sweetalert2';

const Context = createContext();

const Provider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState();
  const [catIdsToChange, setCatIdsToChange] = useState();
  const [selectedState,setSelectedState] = useState()

  const [confirmModel, setConfirmModal] = useState();
  let bathCon = [
    'bath',
    'brushOut',
    'nailTrim',
    'softPaws',
    'tummyShave',
    'pantyShave',
    'defluffCombo',
    'shaveMats',
    'lionCut',
    'bodyShave',
    'fullOfPartial',
    'trimFur',
  ];
  let spaCon = [
    'pantyShaveNailTrim',
    'deFluffMe',
    'brushNailTrim',
    'shortHairFleaShampoo',
    'mediumHairFleaShampoo',
    'longHairFleaShampoo',
    'shortHairDeShedShampoo',
    'mediumHairDeShedShampoo',
    'longHairDeShedShampoo',
    'shortHairMicrotekShampoo',
    'mediumHairMicrotekShampoo',
    'longHairMicrotekShampoo',
  ];
  const [groomingData, setGroomingData] = useState({
    singleSuite: {
      text: 'Single Suite',
      id: [],
      allowedMaxCat: 100,
    },
    kittyCottage: {
      text: 'Kitty Cottage',
      id: [],
      allowedMaxCat: 100,
    },
    adjoiningSuite: {
      text: 'Adjoining Suite',
      id: [],
      allowedMaxCat: 200,
      allowedMinCat: 2,
    },
    villaSuite: {
      text: 'Villa Suite',
      id: [],
      allowedMaxCat: 3,
    },
    catChateau: {
      text: 'Cat Chateau~ Extra Large Villa ',
      id: [],
      allowedMaxCat: 5,
      allowedMinCat: 3,
    },
    doubleSuite: {
      text: 'Double Suite',
      id: [],
      allowedMinCat: 2,
      allowedMaxCat: 2,
    },
    notes: {
      text: '',
      id: [],
    },

    addOn: {
      suites: [],
      id: [],
    },
    noGrooming: [],
    bath: {
      text: 'Bath $70+ For Short Hair Cats',
      bathOption: [],
      shampooOption: [],

      id: [],
      conflictsWith: [
        'bathShortHair',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
        //
      ],
    },
    bathMediumHair: {
      text: 'Bath $75+ For Medium Hair Cats',
      bathOption: [],
      shampooOption: [],

      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathExtraLongHair',
        'bathLongHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
        //
      ],
    },
    bathShortHair: {
      text: 'Bath $80+ For Long Hair Cats',
      bathOption: [],
      shampooOption: [],

      id: [],
      conflictsWith: [
        'bath',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
        //
      ],
    },
    bathLongHair: {
      text: 'Bath $90+ For Extra Long Hair Cats',
      bathOption: [],
      shampooOption: [],

      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
        //
      ],
    },
    bathExtraLongHair: {
      text: 'Bath $90+ * For Extra Long Hair',
      bathOption: [],
      shampooOption: [],

      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
        //
      ],
    },
    brushOut: {
      text: 'Brush Out',
      id: [],
      conflictsWith: [
        'trimFur',
        'fullOfPartial',
        'lionCut',
        'bodyShave',
        ...spaCon,
      ],
    },
    nailTrim: {
      text: 'Nail Trim',
      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        'softPaws',
        ...spaCon,
      ],
    },
    softPaws: {
      text: 'Soft paws front nails only',
      softPawsOption: [],
      firstNailColor: [],
      secondNailColor: [],

      id: [],
      conflictsWith: ['nailTrim', ...spaCon],
    },

    tummyShave: {
      text: 'Tummy Shave',
      id: [],
      conflictsWith: [
        'pantyShave',
        'defluffCombo',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
      ],
    },
    pantyShave: {
      text: 'Panty Shave',
      id: [],
      conflictsWith: [
        'tummyShave',
        'defluffCombo',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
      ],
    },
    defluffCombo: {
      text: 'Defluff Combo $80 Tummy Shave & Panty Shave',
      id: [],
      conflictsWith: [
        'tummyShave',
        'pantyShave',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        ...spaCon,
      ],
    },
    shaveMats: {
      text: 'Shave Mats',
      id: [],
      conflictsWith: [
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        
        ...spaCon,
      ],
    },
    lionCut: {
      text: 'Lion Cut',
      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
        'tummyShave',
        'pantyShave',
        'defluffCombo',
        'shaveMats',

        'brushOut',
        ...spaCon
      ],
      bathOption: [],
      nailTrim: [],
      tailTrim: [],
      shampooOption: [],
    },
    bodyShave: {
      text: 'Body Shave',
      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'fullOfPartial',
        'trimFur',
        'tummyShave',
        'pantyShave',
        'defluffCombo',
        'shaveMats',
        'brushOut',
        ...spaCon,
      ],

      bathOption: [],
      nailTrim: [],
      tailTrim: [],
      shampooOption: [],
    },
    fullOfPartial: {
      text: 'Full or Partial Mohawk',
      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'trimFur',
        'tummyShave',
        'pantyShave',
        'defluffCombo',
        'shaveMats',
        'brushOut',
        ...spaCon,
      ],

      bathOption: [],
      nailTrim: [],
      shampooOption: [],
      shaveOption: [],
      tailTrim: [],
    },
    trimFur: {
      text: 'Trim Fur',
      id: [],
      conflictsWith: [
        'bath',
        'bathShortHair',
        'bathLongHair',
        'bathExtraLongHair',
        'bathMediumHair',
        'nailTrim',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'tummyShave',
        'pantyShave',
        'defluffCombo',
        'shaveMats',
        'brushOut',
        ...spaCon,
      ],
      bathOption: [],
      nailTrim: [],
      shampooOption: [],
      tailTrim: [],
    },
    fleaMedication: {
      text: 'None', // Updates on change
      id: [], // If selected then all cats
    },
    transportationPickUp: {
      text: 'None',
      id: [],
    },
    transportationDropOff: {
      text: 'None',
      id: [],
    },
    transportation: {
      text: { location: '', distance: '', price: '' },
    },
    selectedOption: { text: '', id: [] },
    checkInDate: { text: null, id: [] },
    checkOutDate: { text: null, id: [] },
    feedingSection: [],
    medication: {
      onMedication: '0',
      medicationData: [],
      id: [],
    },

    fVaccine: {
      text: '',
      id: [],
    },

    pantyShaveNailTrim: {
      id: [],
      conflictsWith:bathCon
    },
    deFluffMe: {
      id: [],
      conflictsWith:bathCon

    },
    brushNailTrim: {
      id: [],
      conflictsWith:bathCon

    },
    shortHairFleaShampoo: {
      id: [],
      conflictsWith: ['mediumHairFleaShampoo', 'longHairFleaShampoo',...bathCon],
    },
    mediumHairFleaShampoo: {
      id: [],
      conflictsWith: ['shortHairFleaShampoo', 'longHairFleaShampoo',...bathCon],
    },
    longHairFleaShampoo: {
      id: [],
      conflictsWith: ['shortHairFleaShampoo', 'mediumHairFleaShampoo',...bathCon],
    },
    shortHairDeShedShampoo: {
      id: [],
      conflictsWith:bathCon
    },
    mediumHairDeShedShampoo: {
      id: [],
      conflictsWith:bathCon
    },
    longHairDeShedShampoo: {
      id: [],  conflictsWith:bathCon
    },
    shortHairMicrotekShampoo: {
      id: [],  conflictsWith:bathCon
    },
    mediumHairMicrotekShampoo: {
      id: [],  conflictsWith:bathCon
    },
    longHairMicrotekShampoo: {
      id: [],  conflictsWith:bathCon
    },
    deFleaOption: { id: [] },
  });

  const [errors, setErrors] = useState({});
  function updateMedicationData(data, feed) {
    setGroomingData({
      ...groomingData,
      medication: { ...groomingData.medication, medicationData: data },
      feedingSection: { ...feed },
    });
    let ld = JSON.stringify({
      ...groomingData,
      medication: { ...groomingData.medication, medicationData: data },
      feedingSection: { ...feed },
    });
    localStorage.setItem('groomingData', ld);
  }

  console.log(groomingData,"groomingData fff")

  async function handleState(options, value) {
    console.log(options,value);

    if (options == 'checkOutDate') {
      clearGrooming();
    }
    if (options == 'checkInDate') {
      //  value =new Date(value).toLocaleS/tring('en-US', { day: '2-digit', month: 'numeric', year: 'numeric' });
      console.log(options,value);

      clearGrooming();
      if (groomingData.selectedOption.text == "Grooming" || groomingData.selectedOption.text == "Day Care") {
        setGroomingData({
          ...groomingData,
          [options]: { ...groomingData[options], text: value },
          noGrooming: groomingData.noGrooming.map((item, index) =>
            index === 0 ? { ...item, text: '0' } : item
          ),
        });
      }
      if (groomingData.selectedOption.text == "Grooming" || groomingData.selectedOption.text == "Day Care") {
        setGroomingData({
          ...groomingData,
          [options]: { ...groomingData[options], text: value },
          ['checkOutDate']: { ...groomingData['checkOutDate'], text: value },
        });
        return;
      }
      // if(value.getDay()== 3){
      //   Swal.fire({tittle:"Attention!", html:"<p>We do not do grooming services on Wednesday.</p> <br/> <p class=error-messages> Please select a different day.</p>",icon:"info"})
      // }
    }
    if (options == 'Both') {
      setGroomingData({
        ...groomingData,
        transportationDropOff: {
          ...groomingData.transportationDropOff,
          text: 'Drop-off',
        },
        transportationPickUp: {
          ...groomingData.transportationPickUp,
          text: 'Pick-up',
        },
      });
      return;
    }
    if (options == 'noneBoth') {
      setGroomingData({
        ...groomingData,
        transportationDropOff: {
          ...groomingData.transportationDropOff,
          text: 'None',
        },
        transportationPickUp: {
          ...groomingData.transportationPickUp,
          text: 'None',
        },
      });
      return;
    }
    setGroomingData({
      ...groomingData,
      [options]: { ...groomingData[options], text: value },
    });
  }
  async function handleStateAdd(options, value, catId) {
    // setErrors({});
    let subOption = [...groomingData.fleaMedication.id];
    const newSelection = { id: catId, text: value };

    if (value === 'None') {
      // Remove all entries for the selected catId if "None" is selected
      subOption = subOption.filter((item) => item.id !== catId);
      subOption.push(newSelection);
    } else {
      console.log(options, value, catId);
      const existingMedications = subOption.filter((item) => item.id === catId);
      const index = existingMedications.findIndex(
        (item) => item.text === value
      );

      // If the value already exists, remove it
      if (index !== -1) {
        subOption = subOption.filter(
          (item) => !(item.id === catId && item.text === value)
        );
      } else {
        // Ensure "None" is not part of the selections for this catId
        subOption = subOption.filter(
          (item) => !(item.id === catId && item.text === 'None')
        );

        // Add the new option and enforce the allowed combinations

        if (value.includes('Capstar')) {
          const invalidSelection = existingMedications.find(
            (item) =>
              (!value.includes('Advocate') && item.text.includes('Advocate')) ||
              (!value.includes('Cheristin') && item.text.includes('Cheristin'))
          );
          if (invalidSelection) {
            // Replace invalid selection with the new valid combination
            subOption = subOption.filter(
              (item) => item.id !== catId || item.text === invalidSelection.text
            );
            subOption.push(newSelection);
          } else {
            subOption.push(newSelection);
          }
        } else if (value.includes('Advocate')) {
          // Remove Cheristin if Advocate is selected
          subOption = subOption.filter(
            (item) => !(item.id === catId && item.text.includes('Cheristin'))
          );
          subOption.push(newSelection);
        } else if (value.includes('Cheristin')) {
          // Remove Advocate if Cheristin is selected
          subOption = subOption.filter(
            (item) => !(item.id === catId && item.text.includes('Advocate'))
          );
          subOption.push(newSelection);
        }
      }
    }

    setGroomingData({
      ...groomingData,
      [options]: { ...groomingData[options], id: subOption },
    });
  }
  console.log(groomingData, 'grooming erje');
  async function handleStateAddFVRCP(options, value, catId) {
    // setErrors({});
    let subOption = [...groomingData.fVaccine.id];
    const newSelection = { id: catId, text: value };

    if (value === 'None') {
      // Remove all entries for the selected catId if "None" is selected
      subOption = subOption.filter((item) => item.id !== catId);
      subOption.push(newSelection);
    } else {
      console.log(subOption);

      console.log(options, value, catId);
      const existingMedications = subOption.filter((item) => item.id === catId);
      const index = existingMedications.findIndex((item) => item.id === catId);

      // If the value already exists, remove it
      if (index !== -1) {
        subOption = subOption.filter((item) => !(item.id === catId));
        subOption.push(newSelection);
      } else {
        // Ensure "None" is not part of the selections for this catId
        subOption = subOption.filter(
          (item) => !(item.id === catId && item.text === 'None')
        );

        // Add the new option and enforce the allowed combinations

        subOption.push(newSelection);
      }
    }
    console.log(subOption);
    setGroomingData({
      ...groomingData,
      [options]: { ...groomingData[options], id: subOption },
    });
  }

  const updateGroomingOption = (optionKey, keyName, newValue) => {
    // Update groomingData state

    setGroomingData((prevData) => {
      // Create a shallow copy of the previous state to avoid direct mutation
      const newData = { ...prevData };

      // Set the specified keyName to the newValue
      if (newData[optionKey]) {
        newData[optionKey] = {
          ...newData[optionKey],
          [keyName]: newValue,
        };
      }

      // Return the updated state
      return newData;
    });
  };

  console.log(groomingData, 'sssssssssssssssssssssss');
  // <p className="error-messages">{errors?.groomingError}</p>
  const handleSuiteOptionsSingle = async (optionKey, catIds) => {
    // Create a shallow copy of the previous state to avoid direct mutation

    console.log(optionKey, catIds, 'ssssss');
    let newData = { ...groomingData };
    console.log(newData);
    // Iterate through the first six options in groomingData
    for (const key of Object.keys(newData).slice(0, 6)) {
      if (key !== optionKey) {
        // Remove the catIds from the current option's id array
        newData[key] = {
          ...newData[key],
          id: newData[key].id.filter((id) => !catIds.includes(id)),
        };
      }
    }

    console.log(newData[optionKey], optionKey);
    // Set the catIds to the selected option's id array
    newData[optionKey] = {
      ...newData[optionKey],
      id: [...newData[optionKey].id, ...catIds],
    };
    // Return the updated state
    console.log(newData);

    setGroomingData(newData);

    console.log(newData);
    console.log(checkIdCounts(newData));
    setErrors({ ...errors, suiteErrorsCap: checkIdCounts(newData) });

    return true;
  };
  function clearGrooming() {
    let options = groomingData;
    // Get the keys of the options object
    const keys = Object.keys(options);

    // Loop through the specified range and clear the id arrays
    for (let i = 6; i <= 20; i++) {
      if (keys[i] && options[keys[i]].id) {
        options[keys[i]].id = [];
      }
    }
    setGroomingData(options);
  }
  const checkForConflicts = (optionKey, catIds) => {
    const currentOption = groomingData[optionKey];
    const conflictsWithKeys = currentOption.conflictsWith || [];
    const conflictingOptions = [];

    for (const otherOptionKey of conflictsWithKeys) {
      const otherOption = groomingData[otherOptionKey];
      console.log(otherOption.id, otherOption.text);
      if (otherOption?.id?.some((id) => catIds.includes(id))) {
        conflictingOptions.push(otherOptionKey); // Add conflicting option key
      }
    }

    return conflictingOptions; // Return list of conflicting options
  };

  const handleCheckBathShaveOptions = async (optionKey, catIds) => {
    // Check for conflicts with other options
    const conflictingOptions = checkForConflicts(optionKey, catIds);
    // setErrors({})

    if (conflictingOptions.length > 0) {
      // Show an alert for conflicts
      let swal = await Swal.fire({
        confirmButtonText: 'Ok',
        position: 'center',
        showCancelButton: true,
        allowOutsideClick: false,
        html: `<p>You cannot combine both of these services for the same cat. Press OK to remove  ${conflictingOptions[0]}  , otherwise press Cancel.</p>`,
      });

      if (swal.isDismissed) {
        return false;
      } // Exit the function since there's a conflict
    }

    return true;
  };

  async function handleGroomingOptionChange(optionName, catId) {
    // Clone the groomingData state to avoid direct mutation
    const newGroomingData = { ...groomingData };
    setErrors({});

    // Get the option and its conflicts
    const option = { ...newGroomingData[optionName] };
    if (!option) {
      console.error(`Option ${optionName} does not exist.`);
      return;
    }

    // Check if the catId already exists in the option's ID array
    const idIndex = option.id.indexOf(catId);

    // If the catId is already present, remove it
    if (idIndex !== -1) {
      option.id.splice(idIndex, 1);
    } else {
      // If not present, check for conflicts
      const conflicts = option.conflictsWith || [];
      for (const conflict of conflicts) {
        const conflictOption = newGroomingData[conflict];
        if (conflictOption && conflictOption.id.includes(catId)) {
          console.error(
            `Conflict with ${conflict} option for cat ID ${catId}.`
          );
          console.log(conflictOption);
          // Show an alert for conflicts
          // let swal = await Swal.fire({
          //   confirmButtonText: "Ok",
          //   position: "top",
          //   showCancelButton: true,
          //   allowOutsideClick: false,
          //   html: `<p>You cannot combine both of these services for the same cat. Press OK to remove ${conflictOption.text.split("$")[0]} otherwise press Cancel.</p>`,
          // });

          // if (swal.isDismissed) {
          //   return false;
          // } else {
          // Remove the catId from the conflicting option
          conflictOption.id = conflictOption.id.filter((id) => id !== catId);
          // }
        }
      }
      // Add the catId to the option's ID array
      option.id.push(catId);
    }

    // Update the specific option in newGroomingData
    newGroomingData[optionName] = option;

    // Update the groomingData state
    setGroomingData(newGroomingData);
  }

  function handleOptionChange(mainOptionName, subOptionName, catId, optionId) {
    // Clone the groomingData state to avoid direct mutation
    console.log(mainOptionName, subOptionName, catId, optionId);
    const newGroomingData = { ...groomingData };

    // Get the main option and its conflicts
    const mainOption = { ...newGroomingData[mainOptionName] };
    if (!mainOption) {
      console.error(`Main option ${mainOptionName} does not exist.`);
      return;
    }

    // If subOptionName is provided, work with the nested option array
    if (subOptionName) {
      const subOption = [...mainOption[subOptionName]];

      // Find the index of the object with the given catId
      const index = subOption.findIndex((item) => item.id === catId);

      if (index !== -1) {
        // If the catId is found, remove the object
        subOption.splice(index, 1);
        subOption.push({ id: catId, option_id: optionId, text: optionId });
      } else {
        // If the catId is not found, add the new object
        subOption.push({ id: catId, option_id: optionId, text: optionId });
      }

      // Update the subOption in the mainOption
      mainOption[subOptionName] = subOption;
    }

    // Update the main option in newGroomingData
    newGroomingData[mainOptionName] = mainOption;
    console.log(newGroomingData);
    // Update the groomingData state
    setGroomingData(newGroomingData);
  }
  async function handleRemoveAddOn(e, subOptionName, labelId) {
    e.preventDefault();
    const newGroomingData = { ...groomingData };

    // Get the main option from groomingData
    const mainOption = newGroomingData['addOn'];
    // Get the sub-option array from the main option
    const subOption = mainOption[subOptionName];
    console.log(subOption);
    const subOptionIndex = subOption.findIndex(
      (item) => item.labelId === labelId
    );
    console.log(subOptionIndex, labelId);

    if (subOptionIndex !== -1) {
      subOption.splice(subOptionIndex, 1);
    }
    mainOption[subOptionName] = subOption;

    // Update the main option in newGroomingData
    newGroomingData['addOn'] = mainOption;

    // Update the groomingData state
    setGroomingData(newGroomingData);
    // if (!Array.isArray(subOption)) {
    //   console.error(`Sub-option ${subOptionName} does not exist or is not an array.`);
    //   return;
    // }
  }
  async function handleAddOnChange(subOptionName, catId, text, id) {
    // Clone the groomingData state to avoid direct mutation

    console.log(text, id);
    const newGroomingData = { ...groomingData };
    // setErrors({})
    const mainOption = newGroomingData['addOn'];
    if (!mainOption) {
      console.error(`Main option ${'addOn'} does not exist.`);
      return;
    }
    const subOption = mainOption[subOptionName];
    if (!Array.isArray(subOption)) {
      console.error(
        `Sub-option ${subOptionName} does not exist or is not an array.`
      );
      return;
    }

    const subOptionIndex = subOption.findIndex(
      (item) => item.text === text && item.id == catId
    );
    if (subOptionIndex != -1) return;
    // Get the main option from groomingData

    // Get the sub-option array from the main option

    // Find the index of the object with the given catId
    // const subOptionIndex = subOption.findIndex(item => item.id === catId);

    // If the catId is already present, remove it

    // If the catId is not present, add the new object
    subOption.push({
      id: catId,
      text: text,
      labelId: subOption.length,
      option_id: id,
    });

    // Update the sub-option array in the main option
    mainOption[subOptionName] = subOption;

    // Update the main option in newGroomingData
    newGroomingData['addOn'] = mainOption;

    // Update the groomingData state
    setGroomingData(newGroomingData);
  }

  const clearIdFromAllOptions = (cats, catDataToRemove) => {
    setErrors({ ...errors, groomingError: '' });

    // console.log(cats, catDataRemove)
    const idToRemove = catDataToRemove; // The ID to remove
    const textForRemoved = '0'; // Text for removed or unchecked cats
    const textForAdded = '1'; // Text for added or checked cats

    setGroomingData((prevData) => {
      const newData = { ...prevData };

      const options = [
        'bath',
        'brushOut',
        'nailTrim',
        'softPaws',
        'tummyShave',
        'pantyShave',
        'defluffCombo',
        'shaveMats',
        'lionCut',
        'bodyShave',
        'fullOfPartial',
        'trimFur',
      ];

      // Ensure noGrooming is an array
      if (!Array.isArray(newData['noGrooming'])) {
        newData['noGrooming'] = [];
      }

      // Check if the cat ID is already in noGrooming
      const catIndexInNoGrooming = newData['noGrooming'].findIndex(
        (cat) => cat.id === idToRemove
      );

      if (catIndexInNoGrooming !== -1) {
        // If the ID is in noGrooming, toggle between "0" and "1"
        // newData["noGrooming"][catIndexInNoGrooming].id = 0;

        if (newData['noGrooming'][catIndexInNoGrooming].text === textForAdded) {
          // If it's currently "1", switch to "0" (unchecking)
          newData['noGrooming'][catIndexInNoGrooming].text = textForRemoved;
        } else {
          // If it's currently "0", switch to "1" (checking)
          newData['noGrooming'][catIndexInNoGrooming].text = textForAdded;
        }
      } else {
        // If the ID is not in noGrooming, add it to noGrooming with text "1"
        newData['noGrooming'].push({ id: idToRemove, text: textForAdded });

        // Remove the ID from all grooming options
        options.forEach((option) => {
          if (newData[option]?.id) {
            newData[option].id = newData[option].id.filter(
              (id) => id !== idToRemove
            );
          }
        });
      }

      console.log(newData);
      return newData;
    });
  };

  const clearIdFromAllOptionsSpa = (cats, catDataToRemove) => {
    setErrors({ ...errors, groomingError: '' });

    // console.log(cats, catDataRemove)
    const idToRemove = catDataToRemove; // The ID to remove
    const textForRemoved = '0'; // Text for removed or unchecked cats
    const textForAdded = '1'; // Text for added or checked cats

    setGroomingData((prevData) => {
      const newData = { ...prevData };

      const options = [
        'pantyShaveNailTrim',
        'deFluffMe',
        'brushNailTrim',
        'shortHairFleaShampoo',
        'mediumHairFleaShampoo',
        'longHairFleaShampoo',
        'shortHairDeShedShampoo',
        'mediumHairDeShedShampoo',
        'longHairDeShedShampoo',
        'shortHairMicrotekShampoo',
        'mediumHairMicrotekShampoo',
        'longHairMicrotekShampoo',
        'deFleaOption',
      ];

      // Ensure noGrooming is an array
      // if (!Array.isArray(newData['noGrooming'])) {
      //   newData['noGrooming'] = [];
      // }

      // Check if the cat ID is already in noGrooming
      // const catIndexInNoGrooming = newData['noGrooming'].findIndex(
      //   (cat) => cat.id === idToRemove
      // );

      // If the ID is not in noGrooming, add it to noGrooming with text "1"
      // newData['noGrooming'].push({ id: idToRemove, text: textForAdded });

      // Remove the ID from all grooming options
      options.forEach((option) => {
        if (newData[option]?.id) {
          newData[option].id = newData[option].id.filter(
            (id) => id !== idToRemove
          );
        }
      });

      console.log(newData);
      return newData;
    });
  };

  function checkIdInAllOptions(catId, text) {
    console.log(catId, text);
    console.log(groomingData.noGrooming.id, 'check this');
    let index = groomingData.noGrooming.id.findIndex(
      (item) => item.id == catId && item.text == text
    );
    console.log(index);
    if (index == -1) {
      return false;
    }

    return true;
  }

  console.log(groomingData, 'cjecl');
  // const checkIdInAllOptions = (idToCheck) => {
  //   const options = ["noGrooming"];

  //   for (let option of options) {
  //     console.log(groomingData[option].id,"id of setting");
  //     if (
  //       groomingData[option].id &&
  //       groomingData[option].id.includes(idToCheck)
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const checkIdCounts = (groomingData) => {
    const errors = [];

    for (const key of Object.keys(groomingData).slice(0, 6)) {
      const option = groomingData?.[key];
      console.log(option);
      // Ensure the option exists
      if (!option) {
        errors.push(`Option with key ${key} does not exist.`);
        continue;
      }

      const idCount = option.id.length;

      // Exclude options with empty id arrays from generating errors
      if (idCount === 0) {
        continue;
      }

      const allowedMinCat =
        option.allowedMinCat !== undefined ? option.allowedMinCat : 1;
      const allowedMaxCat = option.allowedMaxCat;
      console.log(idCount, allowedMinCat);
      if (idCount < allowedMinCat) {
        errors.push(
          `${option.text}: requires minimum ${allowedMinCat} cats, but only ${idCount} cat(s) selected.`
        );
      }
    }

    return errors;
  };

  const updateGroomingDataWithServiceId = (services) => {
  
    setGroomingData((prevGroomingData) => {
      const newGroomingData = { ...prevGroomingData };

      services.forEach((service) => {
        const serviceKey = service.service_value;
        if (newGroomingData[serviceKey]) {
          newGroomingData[serviceKey] = {
            ...newGroomingData[serviceKey],
            option_id: service.service_id,
            text: service.service_name,
            price: service?.price,
          };
        }
      });

      return newGroomingData;
    });
  };

  function resetGroomingData() {
    setGroomingData({
      singleSuite: {
        text: 'Single Suite',
        id: [],
        allowedMaxCat: 100,
      },
      kittyCottage: {
        text: 'Kitty Cottage',
        id: [],
        allowedMaxCat: 100,
      },
      adjoiningSuite: {
        text: 'Adjoining Suite',
        id: [],
        allowedMaxCat: 200,
        allowedMinCat: 2,
      },
      villaSuite: {
        text: 'Villa Suite',
        id: [],
        allowedMaxCat: 3,
      },
      catChateau: {
        text: 'Cat Chateau~ Extra Large Villa ',
        id: [],
        allowedMaxCat: 5,
        allowedMinCat: 3,
      },
      doubleSuite: {
        text: 'Double Suite',
        id: [],
        allowedMinCat: 2,
        allowedMaxCat: 2,
      },
      notes: {
        text: '',
        id: [],
      },

      addOn: {
        suites: [],
        id: [],
      },

      noGrooming: [],
      bath: {
        text: 'Bath $70+ * includes nail trim, brushout and ear cleaning',
        bathOption: [],
        shampooOption: [],

        id: [],
        conflictsWith: [
          'nailTrim',
          'lionCut',
          'bodyShave',
          'fullOfPartial',
          'trimFur',
        ],
      },

      brushOut: {
        text: 'Brush Out',
        id: [],
        conflictsWith: ['trimFur', 'fullOfPartial', 'lionCut', 'bodyShave'],
      },
      nailTrim: {
        text: 'Nail Trim',
        id: [],
        conflictsWith: [
          'bath',
          'lionCut',
          'bodyShave',
          'fullOfPartial',
          'trimFur',
          'softPaws',
        ],
      },
      softPaws: {
        text: 'Soft paws front nails only',
        softPawsOption: [],
        firstNailColor: [],
        secondNailColor: [],

        id: [],
        conflictsWith: ['nailTrim'],
      },

      tummyShave: {
        text: 'Tummy Shave',
        id: [],
        conflictsWith: [
          'pantyShave',
          'defluffCombo',
          'lionCut',
          'bodyShave',
          'fullOfPartial',
          'trimFur',
        ],
      },
      pantyShave: {
        text: 'Panty Shave',
        id: [],
        conflictsWith: [
          'tummyShave',
          'defluffCombo',
          'lionCut',
          'bodyShave',
          'fullOfPartial',
          'trimFur',
        ],
      },
      defluffCombo: {
        text: 'Defluff Combo $80 Tummy Shave & Panty Shave',
        id: [],
        conflictsWith: [
          'tummyShave',
          'pantyShave',
          'lionCut',
          'bodyShave',
          'fullOfPartial',
          'trimFur',
        ],
      },
      shaveMats: {
        text: 'Shave Mats',
        id: [],
        conflictsWith: ['lionCut', 'bodyShave', 'fullOfPartial', 'trimFur'],
      },
      lionCut: {
        text: 'Lion Cut',
        id: [],
        conflictsWith: [
          'bath',
          'nailTrim',
          'bodyShave',
          'fullOfPartial',
          'trimFur',
          'tummyShave',
          'pantyShave',
          'defluffCombo',
          'shaveMats',

          'brushOut',
        ],
        bathOption: [],
        nailTrim: [],
        tailTrim: [],
        shampooOption: [],
      },
      bodyShave: {
        text: 'Body Shave',
        id: [],
        conflictsWith: [
          'bath',
          'nailTrim',
          'lionCut',
          'fullOfPartial',
          'trimFur',
          'tummyShave',
          'pantyShave',
          'defluffCombo',
          'shaveMats',
          'brushOut',
        ],

        bathOption: [],
        nailTrim: [],
        tailTrim: [],
        shampooOption: [],
      },
      fullOfPartial: {
        text: 'Full or Partial Mohawk',
        id: [],
        conflictsWith: [
          'bath',
          'nailTrim',
          'lionCut',
          'bodyShave',
          'trimFur',
          'tummyShave',
          'pantyShave',
          'defluffCombo',
          'shaveMats',
          'brushOut',
        ],

        bathOption: [],
        nailTrim: [],
        shampooOption: [],
        shaveOption: [],
        tailTrim: [],
      },
      trimFur: {
        text: 'Trim Fur',
        id: [],
        conflictsWith: [
          'bath',
          'nailTrim',
          'lionCut',
          'bodyShave',
          'fullOfPartial',
          'tummyShave',
          'pantyShave',
          'defluffCombo',
          'shaveMats',
          'brushOut',
        ],
        bathOption: [],
        nailTrim: [],
        shampooOption: [],
        tailTrim: [],
      },
      fleaMedication: {
        text: 'None', // Updates on change
        id: [], // If selected then all cats
      },
      transportationPickUp: {
        text: 'None',
        id: [],
      },
      transportationDropOff: {
        text: 'None',
        id: [],
      },
      transportation: {
        text: { location: '', distance: '', price: '' },
      },
      selectedOption: { text: '', id: [] },
      checkInDate: { text: null, id: [] },
      checkOutDate: { text: null, id: [] },
      feedingSection: [],
      medication: {
        onMedication: '0',
        medicationData: [],
        id: [],
      },

      fVaccine: {
        text: '',
        id: [],
      },
      pantyShaveNailTrim: {
        id: [],
      },
      deFluffMe: {
        id: [],
      },
      brushNailTrim: {
        id: [],
      },
      shortHairFleaShampoo: {
        id: [],
        conflictsWith: ['mediumHairFleaShampoo', 'longHairFleaShampoo'],
      },
      mediumHairFleaShampoo: {
        id: [],
        conflictsWith: ['shortHairFleaShampoo', 'longHairFleaShampoo'],
      },
      longHairFleaShampoo: {
        id: [],
        conflictsWith: ['shortHairFleaShampoo', 'mediumHairFleaShampoo'],
      },
      shortHairDeShedShampoo: {
        id: [],
      },
      mediumHairDeShedShampoo: {
        id: [],
      },
      longHairDeShedShampoo: {
        id: [],
      },
      shortHairMicrotekShampoo: {
        id: [],
      },
      mediumHairMicrotekShampoo: {
        id: [],
      },
      longHairMicrotekShampoo: {
        id: [],
      },
      deFleaOption: { id: [] },
    });
  }


  const resetGroomingDataService = (selectedValue) => {


    // if(selectedState == groomingData?.selectedOption?.text){
    //   handleState()
    // }

    console.log(groomingData ,"groomingDataaaaa")
   
    setGroomingData({
      selectedOption: { text: selectedValue, id:  []},
      checkInDate: { text: null, id: [] },
      checkOutDate: { text: null, id: [] },
      singleSuite: { ...groomingData.singleSuite },
      kittyCottage: {  ...groomingData.kittyCottage },
      adjoiningSuite: { ...groomingData.adjoiningSuite},
      villaSuite: {  ...groomingData.villaSuite},
      catChateau: {  ...groomingData.catChateau },
      doubleSuite: {  ...groomingData.doubleSuite },
      notes: { text: '', id: [] },
      addOn: { suites: [], id: [] },
      noGrooming: [],
      bath: {
        text: 'Bath $70+ * includes nail trim, brushout and ear cleaning',
        bathOption: [],
        shampooOption: [],
        id: [],
        conflictsWith: ['nailTrim', 'lionCut', 'bodyShave', 'fullOfPartial', 'trimFur', ...spaCon],
      },
      brushOut: {
        text: 'Brush Out',
        id: [],
        conflictsWith: ['trimFur', 'fullOfPartial', 'lionCut', 'bodyShave', ...spaCon],
      },
      nailTrim: {
        text: 'Nail Trim',
        id: [],
        conflictsWith: ['bath', 'lionCut', 'bodyShave', ...spaCon],
      },
      softPaws: {
        text: 'Soft paws front nails only',
        softPawsOption: [],
        firstNailColor: [],
        secondNailColor: [],
        id: [],
        conflictsWith: ['nailTrim', ...spaCon],
      },
      tummyShave: {
        text: 'Tummy Shave',
        id: [],
        conflictsWith: ['pantyShave', 'defluffCombo', 'lionCut', ...spaCon],
      },
      pantyShave: {
        text: 'Panty Shave',
        id: [],
        conflictsWith: ['tummyShave', 'defluffCombo', 'lionCut', ...spaCon],
      },
      defluffCombo: {
        text: 'Defluff Combo $80 Tummy Shave & Panty Shave',
        id: [],
        conflictsWith: ['tummyShave', 'pantyShave', 'lionCut', ...spaCon],
      },
      shaveMats: {
        text: 'Shave Mats',
        id: [],
        conflictsWith: ['lionCut', 'bodyShave', 'fullOfPartial', 'trimFur', ...spaCon],
      },
      lionCut: {
        text: 'Lion Cut',
        id: [],
        conflictsWith: ['bath', 'nailTrim', 'bodyShave', ...spaCon],
        bathOption: [],
        nailTrim: [],
        tailTrim: [],
        shampooOption: [],
      },
      bodyShave: {
        text: 'Body Shave',
        id: [],
        conflictsWith: ['bath', 'nailTrim', 'lionCut', ...spaCon],
        bathOption: [],
        nailTrim: [],
        tailTrim: [],
        shampooOption: [],
      },
      fullOfPartial: {
        text: 'Full or Partial Mohawk',
        id: [],
        conflictsWith: ['bath', 'nailTrim', 'lionCut', ...spaCon],
        bathOption: [],
        nailTrim: [],
        shampooOption: [],
        shaveOption: [],
        tailTrim: [],
      },
      trimFur: {
        text: 'Trim Fur',
        id: [],
        conflictsWith: ['bath', 'nailTrim', 'lionCut', ...spaCon],
        bathOption: [],
        nailTrim: [],
        shampooOption: [],
        tailTrim: [],
      },
      fleaMedication: { text: 'None', id: [] },
      transportationPickUp: { text: 'None', id: [] },
      transportationDropOff: { text: 'None', id: [] },
      transportation: { text: { location: '', distance: '', price: '' } },
      feedingSection: [],
      medication: { onMedication: '0', medicationData: [], id: [] },
      fVaccine: { text: '', id: [] },
      pantyShaveNailTrim: { id: [], conflictsWith: bathCon },
      deFluffMe: { id: [], conflictsWith: bathCon },
      brushNailTrim: { id: [], conflictsWith: bathCon },
      shortHairFleaShampoo: { id: [], conflictsWith: ['mediumHairFleaShampoo', 'longHairFleaShampoo', ...bathCon] },
      mediumHairFleaShampoo: { id: [], conflictsWith: ['shortHairFleaShampoo', 'longHairFleaShampoo', ...bathCon] },
      longHairFleaShampoo: { id: [], conflictsWith: ['shortHairFleaShampoo', 'mediumHairFleaShampoo', ...bathCon] },
      shortHairDeShedShampoo: { id: [], conflictsWith: bathCon },
      mediumHairDeShedShampoo: { id: [], conflictsWith: bathCon },
      longHairDeShedShampoo: { id: [], conflictsWith: bathCon },
      shortHairMicrotekShampoo: { id: [], conflictsWith: bathCon },
      mediumHairMicrotekShampoo: { id: [], conflictsWith: bathCon },
      longHairMicrotekShampoo: { id: [], conflictsWith: bathCon },
      deFleaOption: { id: [] },
    });
  };
  

  const exposed = {
    handleOptionChange,
    clearGrooming,
    // handleBathShaveOptionsSingle,
    handleAddOnChange,
    handleSuiteOptionsSingle,
    handleCheckBathShaveOptions,
    updateMedicationData,
    updateGroomingOption,
    handleGroomingOptionChange,
    handleState,
    setSelectedState,
    handleStateAdd,
    clearIdFromAllOptionsSpa,
    resetGroomingData,
    resetGroomingDataService,
    groomingData,
    setGroomingData,
    handleStateAddFVRCP,
    handleRemoveAddOn,
    errors,
    setErrors,
    clearIdFromAllOptions,
    checkIdInAllOptions,
    updateGroomingDataWithServiceId,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useGrooming = () => useContext(Context);

export default Provider;
