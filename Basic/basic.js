// `node basic` to execute this

function testFlexibleReturnItem(booleanVal) {
    let someObj = { label: 2, value: "value_2" };
    return [
        ...(booleanVal 
            ? [ { label: 1, value: 'value_1' }, someObj ] 
            : [ 'nothing here!!!' ]
        ),
    ];
}
console.log('trueCondition=', testFlexibleReturnItem(true))
console.log('falseCondition=', testFlexibleReturnItem(false))

const dataMock = [
    {
        id: "ID1",
        author: "Jan Yodsawa",
        age: 26,
        someList: [
            { label: "label_1", value: "value_1" },
            { label: "label_2", value: "value_2" },
            { label: "label_3", value: "value_9" },
        ],
    },
    {
        id: "ID2",
        author: "Fon Taksa",
        age: 26,
        someList: [
            { label: "label_1", value: "value_1" },
            { label: "label_2", value: "value_2" },
        ],
    },
    {
        id: "ID3",
        author: "Beni Hime",
        age: 16,
        someList: [
            { label: "label_1", value: "value_1" },
            { label: "label_4", value: "value_8" },
        ],
    }
];

console.log('original dataMock', dataMock)

// .filter - return Array, if match condition
let notFocusDataArr = dataMock.filter((item, index) => {
    return item.age !== 16
});
console.log('notFocusDataArr', notFocusDataArr)

// .find - if found 1 record(match condition) return Object out of Array
let focusData = dataMock.find(item => item.age === 16);
console.log('focusData', focusData)

let focusNewDataArr = [focusData].map((item, index) => {
    return {
        id: item.id,
        author: item.author,
        ...(item.author.includes(' ')
        ? { author: item?.author?.replace(' ','-') }
        : { author: item.author }
        ),
        age: item.age - 6,
        someList: item.someList.map((it,index) => {
            let listLength = item?.someList?.length;
            let isLast = index+1===listLength;
            return {
                label: it.label,
                ...(!isLast? {value: it.value} : {value: 'new val'}) 
            }
        })
    }
});
console.log('focusNewDataArr', focusNewDataArr)

let newDataArr = [...notFocusDataArr, focusData, ...focusNewDataArr];
console.log('newDataArr', newDataArr)