const student = {
    name: "John Doe",
    grades: [
        { name: "math", grade: 80 },
        { name: "science", grade: 100 },
        { name: "history", grade: 60 },
        { name: "PE", grade: 90 },
        { name: "music", grade: 98 }
    ]
};

function analyzeGrades(student) {
    const grades = student.grades;
    const gradeAvg = grades.reduce((sum, course) => sum + course.grade, 0) / grades.length;
    const highestGrade = grades.reduce((max, course) => 
        course.grade > max.grade ? course : max
    );

    const lowestGrade = grades.reduce((min, course) => 
        course.grade < min.grade ? course : min
    );
    
    const result = {
        name: student.name,
        gradeAvg: gradeAvg,
        highestGrade: highestGrade.name,
        lowestGrade: lowestGrade.name
    };
    
    return result;
}

const result = analyzeGrades(student);
console.log("Student Grades:");
console.log(student);
console.log("\nStudent Grade Analysis:");
console.log(result);