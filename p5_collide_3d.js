p5.prototype.collideSphereSphere(x1,y1,z1,r1, x2,y2,z2,r2) {
    // Calculate the distance between both spheres
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dz = z2 - z1;
    let dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
    // Now check
    return dist <= r1 + r2; // returns true iff they are touching or overlapping
};

p5.prototype.collideSpherePlane(spos,sr, points, mode) {
    // There are multiple ways of checking if a sphere is intersecting a plane... this is determined by the mode
    mode = mode || 0;
    if (mode === 0) { // points are all points on the plane
        if (points.length < 3) throw new SyntaxError("\"Array 'points' must contain three points on the plane in this mode!\" - collideSpherePlane");
        // Calculate the plane's normal
        let a = p2.sub(p1);
        let b = p3.sub(p1);
        let normal = a.cross(b);
        normal = normal.normalize(); // because normals are always a unit vector
        
        // calculate the plane's D constant
        let D = normal.dot(p1);
        
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
