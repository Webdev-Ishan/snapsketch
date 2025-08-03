type Shapes =
  | {
      type: "Rectangle";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "Circle";
      x: number;
      y: number;
      radius: number;
    }
  | {
      type: "Text";
      message: string;
      x: number;
      y: number;
    }
  | {
      type: "Line";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "Triangle";
      x: number;
      y: number;
      x2: number;
      y2: number;
      width: number;
      height: number;
    };
export const creatRectangle = (
  socket: WebSocket | null,
  roomID: string,
  startX: number,
  startY: number,
  width: number,
  height: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Rectangle",
      x: startX,
      y: startY,
      width: width,
      height: height,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const creatCircle = (
  socket: WebSocket | null,
  roomID: string,
  startX: number,
  startY: number,
  radius: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Circle",
      x: startX,
      y: startY,
      radius: radius,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const createText = (
  socket: WebSocket | null,
  roomID: string,
  message: string | null,
  x: number,
  y: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Text",
      message: message,
      x: x,
      y: y,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const createLine = (
  socket: WebSocket | null,
  roomID: string,
  startx: number,
  starty: number,
  endX: number,
  endY: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Line",
      x: startx,
      y: starty,
      width: endX,
      height: endY,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const createTriangle = (
  socket: WebSocket | null,
  roomID: string,
  startx: number,
  starty: number,
  midx: number,
  midy: number,
  endX: number,
  endY: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Triangle",
      x: startx,
      y: starty,
      x2: midx,
      y2: midy,
      width: endX,
      height: endY,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const convertServerShapeToClient = (shape: Shapes): Shapes => {
  if (shape.type === "Rectangle") {
    return {
      type: "Rectangle",
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };
  } else if (shape.type === "Circle") {
    return {
      type: "Circle",
      x: shape.x, // fallback to x
      y: shape.y, // fallback to y
      radius: shape.radius,
    };
  } else if (shape.type === "Text") {
    return {
      type: shape.type,
      message: shape.message,
      x: shape.x,
      y: shape.y,
    };
  } else if (shape.type === "Line") {
    return {
      type: shape.type,
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };
  } else {
    return {
      type: shape.type,
      x: shape.x,
      y: shape.y,
      x2: shape.x2,
      y2: shape.y2,
      width: shape.width,
      height: shape.height,
    };
  }
};
