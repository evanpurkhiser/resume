all: resume.pdf

resume.pdf: resume.tex template.sty
	pdflatex resume.tex resume.pdf

clean:
	rm *.{out,aux,log}
