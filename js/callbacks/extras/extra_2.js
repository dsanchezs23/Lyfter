const listA = ['Alice', 'Bob', 'Charlie', 'Diana'];
const listB = ['Eve', 'Bob', 'Frank', 'Alice'];

function compareNameLists(list1, list2, callback) {
    const commonNames = [];

    for (let i = 0; i < list1.length; i += 1) {
        for (let j = 0; j < list2.length; j += 1) {
            if (list1[i] === list2[j] && commonNames.indexOf(list1[i]) === -1) {
                commonNames.push(list1[i]);
            }
        }
    }

    callback(commonNames);
}

function printCommonNames(names) {
    if (names.length === 0) {
        console.log('No common names found.');
        return;
    }

    console.log('Common names:');
    for (let i = 0; i < names.length; i += 1) {
        console.log(names[i]);
    }
}

compareNameLists(listA, listB, printCommonNames);