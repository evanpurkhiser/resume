all: resume.pdf

resume.pdf: resume.tex template.sty
	pdflatex -halt-on-error resume.tex resume.pdf

clean:
	rm *.{out,aux,log}
