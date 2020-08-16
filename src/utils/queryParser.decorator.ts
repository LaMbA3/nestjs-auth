import { QueryBuilder } from 'typeorm-query-parser';



export const queryParser = new QueryBuilder({
    LOOKUP_DELIMITER:'|',
    EXACT: '=',
    CONTAINS: 'has',
    IS_NULL: 'isnull',
    GT: '>',
    GTE: '>=',
    LT: '<',
    LTE: '<=',
    STARTS_WITH: 's',
    ENDS_WITH: 'e',
    IN: 'in',
    BETWEEN: '$bet',
});

// console.log(queryParser.getOptions());