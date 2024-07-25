'use strict';

const settings = {
    maxLevel: 10,
    innerPadding: 5,
    outerPadding: 5
};

const diagram = {
    // Funktion zur Erstellung des Diagramms
    createDiagram(data) {
        const skillsBar = document.querySelector('#skillsBarChart');
        skillsBar.innerHTML = ''; // Card leeren um inhalt zu überschreiben

        const wrapper = document.createElement('div');
        wrapper.className = 'diagram';
        skillsBar.append(wrapper);

        // Canvas für das Diagramm
        const c = document.createElement('canvas');
        c.width = 900;
        c.height = 350;
        wrapper.append(c);

        // Berechnung der Mausposition relativ zum Canvas
        const getMousePos = (canvas, evt) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        };

        c.addEventListener('mousemove', evt => {
            const mousePos = getMousePos(c, evt);
            diagram.render(
                c,
                data,
                settings.maxLevel,
                settings.innerPadding,
                mousePos.x
            );
        });

        c.addEventListener('mouseleave', () => {
            diagram.render(
                c,
                data,
                settings.maxLevel,
                settings.innerPadding
            );
        });

        diagram.render(
            c,
            data,
            settings.maxLevel,
            settings.innerPadding
        );
    },

    // Darstellung des Diagramms
    render(c, data, max, innerPadding, mouseX = -1) {
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);


        let barWidth = (c.width - innerPadding * (data.length - 1)) / data.length;
        
        for (let i = 0; i < data.length; i++) {
            let value = data[i].level;
            let label = data[i].name;
            let x = i * (barWidth + innerPadding);
            let y = c.height - 50 - (c.height / max * value); // Platz für Text berücksichtigen
            
            if (mouseX > x && mouseX < x + barWidth) {
                ctx.fillStyle = '#8dd9d5';
            } else {
                ctx.fillStyle = '#000';
            }

            ctx.fillRect(
                x,
                y,
                barWidth,
                c.height - 50 - y // Platz für Text berücksichtigen
            );

            // Text unter den Balken
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial, Helvetica, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(
                label,
                x + barWidth / 2,
                c.height - 30
            );
            ctx.fillStyle = '#ffffff';
            ctx.fillText(
                value,
                x + barWidth / 2,
                c.height - 60
            );
        }
    }
};

export default diagram;