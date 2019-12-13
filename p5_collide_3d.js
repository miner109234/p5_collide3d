p5.prototype.collideSphereSphere = function(x1,y1,z1,r1, x2,y2,z2,r2) {
    // Calculate the distance between both spheres
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dz = z2 - z1;
    let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    // Now check
    return dist <= r1 + r2; // returns true iff they are touching or overlapping
};

p5.prototype.collideSpherePlane = function(spos,sr, points, mode) {
    // There are multiple ways of checking if a sphere is intersecting a plane... this is determined by the mode
    mode = mode || 0;
    if (mode === 0) { // points are all points on the plane
        if (points.length < 3) throw new SyntaxError("\"Array 'points' must contain three points on the plane in this mode!\" - collideSpherePlane");
        // Calculate the plane's normal
        let a = points[1].sub(points[0]);
        let b = points[2].sub(points[0]);
        let normal = a.cross(b);
        normal = normal.normalize(); // because normals are always a unit vector
        
        // calculate the plane's D constant
        let D = normal.dot(points[0]);
        
        // calculate the distance
        let dist = Math.abs(normal.dot(spos) - D);
        return dist <= sr; // collsion
    } else if (mode == 1) { // points[1] is the normal of the plane and points[0] is a point on the plane
        if (points.length < 2) throw new SyntaxError("\"Array 'points' must contain a point on the plane and the plane's normal in this mode!\" - collideSpherePlane");
        
        // calculate the plane's D constant
        let D = points[1].dot(points[0]);
        
        // calculate the distance
        let dist = Math.abs(points[1].dot(spos) - D);
        return dist <= sr; // collsion
    } else if (mode == 2) { // points[0] is the normal of the plane and points[1] is the D constant of the plane
        // calculate the distance
        let dist = Math.abs(points[0].dot(spos) - points[1]);
        
        return dist <= sr; // collsion
    }
};

p5.prototype.collidePlanePlane = function(plane1Points, plane2Points, mode) {
    // There are multiple ways of checking if a plane is intersecting a plane... this is determined by the mode
    mode = mode || 0;
    
    // planes are colliding iff the normals are not inline (extention of the fact parrallel lines don't intersect)
    if (mode === 0) { // two arrays of 3 points
        if (plane1Points.length < 3) throw new SyntaxError("\"Array 'plane1Points' must contain three points on the plane in this mode!\" - collidePlanePlane");
        if (plane2Points.length < 3) throw new SyntaxError("\"Array 'plane2Points' must contain three points on the plane in this mode!\" - collidePlanePlane");
        // Calculate the plane1's normal
        let a = plane1Points[1].sub(plane1Points[0]);
        let b = plane1Points[2].sub(plane1Points[0]);
        let normal1 = a.cross(b);
        normal1 = normal1.normalize(); // because normals are always a unit vector
        // Calculate the plane2's normal
        a = plane2Points[1].sub(plane2Points[0]);
        b = plane2Points[2].sub(plane2Points[0]);
        let normal2 = a.cross(b);
        normal2 = normal2.normalize(); // because normals are always a unit vector
        
        // they are parrallel iff n1 dot n2 == 0
        return normal1.dot(normal2) !== 0;
    } else (mode == 1) {
        if (plane1Points instanceof Array) throw new SyntaxError("\"'plane1Points' must be the plane's normal in this mode, not an Array!\" - collidePlanePlane");
        if (plane2Points.length < 3) throw new SyntaxError("\"Array 'plane2Points' must contain three points on the plane in this mode!\" - collidePlanePlane");
        // Calculate the plane2's normal
        let a = plane2Points[1].sub(plane2Points[0]);
        let b = plane2Points[2].sub(plane2Points[0]);
        let normal2 = a.cross(b);
        normal2 = normal2.normalize(); // because normals are always a unit vector
        
        // they are parrallel iff n1 dot n2 == 0
        return plane1Points.dot(normal2) !== 0;
    } else (mode == 2) {
        if (plane1Points.length < 3) throw new SyntaxError("\"Array 'plane1Points' must contain three points on the plane in this mode!\" - collidePlanePlane");
        if (plane2Points instanceof Array) throw new SyntaxError("\"'plane2Points' must be the plane's normal in this mode, not an Array!\" - collidePlanePlane");
        // Calculate the plane2's normal
        let a = plane1Points[1].sub(plane1Points[0]);
        let b = plane1Points[2].sub(plane1Points[0]);
        let normal1 = a.cross(b);
        normal1 = normal1.normalize(); // because normals are always a unit vector
        
        // they are parrallel iff n1 dot n2 == 0
        return normal1.dot(plane2Points) !== 0;
    } else (mode == 3) {
        if (plane1Points instanceof Array) throw new SyntaxError("\"'plane1Points' must be the plane's normal in this mode, not an Array!\" - collidePlanePlane");
        if (plane2Points instanceof Array) throw new SyntaxError("\"'plane2Points' must be the plane's normal in this mode, not an Array!\" - collidePlanePlane");
        
        // they are parrallel iff n1 dot n2 == 0
        return plane1Points.dot(plane2Points) !== 0;
    }
};
