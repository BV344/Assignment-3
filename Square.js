/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        -0.5, 0.5, 0.5, //Vertex 0
        -0.5, -0.5, 0.5, //Vertex 1
        0.5, -0.5, 0.5, //Vertex 2
        0.5, 0.5, 0.5, //Vertex 3
        -0.5, 0.5, -0.5, //Vertex 4
        -0.5, -0.5, -0.5, //Vertex 5
        0.5, -0.5, -0.5, //Vertex 6
        0.5, 0.5, -0.5  //Vertex 7
    ];


    let indices = [
        3, 0, 2,
        2, 0, 1,
        5, 4, 6,
        6, 4, 7,
        7, 4, 3,
        3, 4, 0,
        1, 5, 2,
        2, 5, 6,
        0, 4, 1,
        1, 4, 5,
        7, 3, 6,
        6, 3, 2,
        ];
        
    
    //let positions = [
      //  0.0, 0.0,  // Vertex 0
        //1.0, 0.0,  // Vertex 1
        //0.0, 1.0,  // Vertex 2
        //1.0, 1.0   // Vertex 3
//    ];

  //  let indices = [
    //    0, 1, 2,
      //  1, 2, 3
    //];
    

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
        "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    
    };
};