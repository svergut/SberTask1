const data = {
  tree: [
    {
      name: 'name1',
      tree_1: [
        { name: 'name2' },
        { name: 'name3' },
        {
          name: 'name4',
          tree_2: [
            { name: 'name5' },
            { name: 'name6' },
            {
              tree_3: [
                { name: undefined },
                { name: 'name7', age: 20 },
                { name: 'name8', age: 15 },
                { name: 'name9', age: 31 },
                { name: 'name10', age: 30 },
                { name: 'name1', age: 30 },
                { name: undefined, age: undefined },
                { name: 'empty', age: 'empty' },
              ],
            },
          ],
        },
        { name: 'name11' },
      ],
    },

    {
      name: 'name12',
      tree_4: [{ name: 'name3' }],
    },
  ],
};

function recursivelyFindTree(data, treeNameToFind) {
    const treeFieldNames = Object.keys(data).filter((propertyName) => propertyName.startsWith('tree'))
    
    for (const treeFieldName of treeFieldNames) {
        const treeContent = data[treeFieldName]

        if (treeFieldName === treeNameToFind) {
            return treeContent
                .filter(({ name }) => name !== undefined && name !== 'empty') 
                .sort((a, b) => {
                    if (a.name.length != b.name.length) {
                        return a.name.length > b.name.length ? -1 : 1
                    }
                    else {
                        return b.name.localeCompare(a.name)
                    }
                })
        }
        
        for (const item of treeContent) {
            const searchResult = recursivelyFindTree(item, treeNameToFind)
            
            if (searchResult) {
                return searchResult
            }
        }
    }
}

console.log(recursivelyFindTree(data, 'tree_3', 0))
